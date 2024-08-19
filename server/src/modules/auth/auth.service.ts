import { User } from 'src/modules/users/interfaces/user.interface';
import { LoginDto, RegisterDto } from 'src/modules/auth/dto/auth.dto';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '@db/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/users.service';
import { nanoid } from 'nanoid';
import { MailService } from 'src/providers/email/mail.service';
@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly userService: UsersService,
        private mailService: MailService,
    ) { }

    register = async (registerDto: RegisterDto): Promise<User> => {
        const existingUser = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { email: registerDto.email },
                    { username: registerDto.username }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === registerDto.email) {
                throw new HttpException({ message: "This email has been used." }, HttpStatus.BAD_REQUEST);
            }
            if (existingUser.username === registerDto.username) {
                throw new HttpException({ message: "This username has been used." }, HttpStatus.BAD_REQUEST);
            }
        }

        const hashPassword = await hash(registerDto.password, 10);

        const res = await this.prismaService.user.create({
            data: { ...registerDto, password: hashPassword }
        })

        return res;
    }

    login = async (data: { email: string, password: string }): Promise<any> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }

        })

        if (!user) {
            throw new HttpException({ message: "Account is not exist." }, HttpStatus.UNAUTHORIZED);
        }
        const verify = await compare(data.password, user.password);

        if (!verify) {
            throw new HttpException({ message: "Password is incorrect." }, HttpStatus.UNAUTHORIZED);
        }
        const payload = { id: user.id, username: user.username, email: user.email }
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '1h'
        })
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: '7d'
        })
        return {
            accessToken,
            refreshToken
        }
    }

    async getUser(): Promise<User[]> {
        const users = await this.prismaService.user.findMany();
        return users;
    }

    async detailUser(userName: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { username: userName },
        });
        return user;
    }

    async forgotPassword(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            }
        })
        if (user) {

            var expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const resetToken = nanoid();

            // Delete existed token
            await this.prismaService.forgotPasswordToken.delete({
                where: {
                    userId: user.id,
                }
            })

            // Create new token
            await this.prismaService.forgotPasswordToken.create({
                data: {
                    token: resetToken,
                    expires: expiryDate,
                    userId: user.id
                }
            })

            this.mailService.sendPasswordResetEmail(email, resetToken);
        }
        return { message: 'If this user exists, they will receive an email' };
    }

    async resetPassword(newPassword: string, resetToken: string) {
        const token = await this.prismaService.forgotPasswordToken.findUnique(
            {
                where: {
                    token: resetToken,
                    expires: { gt: new Date() },
                }
            }
        )

        if (!token) {
            throw new UnauthorizedException('Invalid link');
        }


        await this.prismaService.forgotPasswordToken.delete({
            where: {
                token: resetToken,
                expires: { gt: new Date() },
            }
        })


        const user = await this.prismaService.user.findUnique({
            where: {
                id: token.userId,
            }
        })

        if (!user) {
            throw new InternalServerErrorException();
        }

        await this.prismaService.user.update({
            where: {
                id: token.userId,
            },
            data: {
                password: await hash(newPassword, 10),
            }
        })
    }
}