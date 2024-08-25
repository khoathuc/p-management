import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { User } from '@modules/auth/models/user.model';
import { RegisterDto } from '@modules/auth/dto/auth.dto';
import { PrismaService } from '@db/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/users.service';
import { nanoid } from 'nanoid';
import { EmailService } from 'src/providers/email/mail.service';
import { Token } from '@shared/token';
import { DTC } from '@shared/dtc';
@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService, 
        private jwtService: JwtService, 
        private readonly userService: UsersService,
        private emailService: EmailService,
    ) { }

    register = async (registerDto: RegisterDto): Promise<User> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: registerDto.email
            }
        })
        if (user) {
            throw new HttpException({ message: 'This email has been used' }, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await hash(registerDto.password, 10)
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

        const payload = { id: user.id, username: user.username, email: user.username }
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
        if(user){
            const forgotPasswordExpiresHours = 1;
            const expiryDate = DTC.nextHours(forgotPasswordExpiresHours);
            const resetToken = Token.generate();

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

            this.emailService.sendPasswordResetEmail(email, resetToken);
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

        if(!token) {
            throw new UnauthorizedException('Invalid link');
        } 
        
        
        await this.prismaService.forgotPasswordToken.delete({
            where: {
                token: resetToken,
                expires:{ gt: new Date() },
            }
        })
        

        const user = await this.prismaService.user.findUnique({
            where: {
                id: token.userId,
            }
        })

        if(!user) {
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