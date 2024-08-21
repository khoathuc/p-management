import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '@modules/auth/models/user.model';
import { RegisterDto } from '@modules/auth/dto/auth.dto';
import { PrismaService } from '@db/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDto } from './dto/google.user.dto';
@Injectable()
export class AuthService {


    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

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

    async validateUser(googleUser: GoogleUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: googleUser.email,
            }
        })
        if(user) {
            const account = await this.prismaService.account.findUnique({
                where: {
                    userId: user.id,
                }
            })
            if(account){
                return account;
            } 
            await this.prismaService.account.create({
                data: {
                    userId: user.id,
                    email: googleUser.email,
                    type: 'Oauth',
                    provider: 'Google',
                    providerAccountId: googleUser.providerId,
                    refresh_token: googleUser.refreshToken,
                    access_token: googleUser.accessToken,
                }
            })
            return account;    
        }
        // Create new User 
        const newUser = await this.prismaService.user.create({
            data: {
                username: googleUser.displayName,
                email: googleUser.email,
                status: 1,
            }
        })
        const account = await this.prismaService.account.create({
            data: {
                userId: newUser.id,
                email: googleUser.email,
                type: 'Oauth',
                provider: 'Google',
                providerAccountId: googleUser.providerId,
                refresh_token: googleUser.refreshToken,
                access_token: googleUser.accessToken,
            }
        });
        return account;
    }
}