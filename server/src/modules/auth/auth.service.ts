<<<<<<< HEAD
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { User } from '@modules/auth/models/user.model';
import { RegisterDto } from '@modules/auth/dto/auth.dto';
import { PrismaService } from '@db/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/users.service';
import { nanoid } from 'nanoid';
import { MailService } from 'src/providers/email/mail.service';

=======
import { RegisterDto } from "@modules/auth/dto/register.dto";
import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { hash, compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@modules/users/users.service";
import { nanoid } from "nanoid";
import { MailService } from "src/providers/email/mail.service";
import { LoginDto } from "./dto/login.dto";
import { AuthPayload } from "@interfaces/auth.payload";
import { GoogleUserDto } from './dto/google.user.dto';
>>>>>>> 2bf9913baf2fc0da8e22d9e2152df58546163c34
@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService,
        private mailService: MailService
    ) {}

    /**
     * @desc register new user
     * @param registerDto
     * @returns
     */
    async register(registerDto: RegisterDto) {
        // Check if username and email are already registered
        const existingUser = await this.usersService.getByEmailOrUsername({
            email: registerDto.email,
            username: registerDto.username,
        });

        if (existingUser) {
            if (existingUser.email === registerDto.email) {
                throw new Error("This email has been used.");
            }
            if (existingUser.username === registerDto.username) {
                throw new Error("This username has been used.");
            }
        }

        // Create new user
        return await this.usersService.create(registerDto);

        // TODO: create new email verify token

        // TODO: send email verify account.

        // TODO: track user register metric.
    }

    /**
     * @desc login user
     * @param data
     * @returns
     */
    async login(data: LoginDto): Promise<any> {
        // Check if user exists
        const user = await this.usersService.getByEmail(data.email);
        if (!user) {
            throw new Error("Account is not exist.");
        }

        // Check if password is correct
        const verify = await compare(data.password, user.password);
        if (!verify) {
            throw new Error("Password is incorrect");
        }

        const payload: AuthPayload = this.usersService.releasePayload(user);

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: "1h",
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: "7d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }


    async validateUser(googleUser: GoogleUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: googleUser.email,
            }
        })
        if (user) {
<<<<<<< HEAD
            throw new HttpException({ message: 'This email has been used' }, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await hash(registerDto.password, 10)
        const res = await this.prismaService.user.create({
            data: { ...registerDto, password: hashPassword }
        })

        return res;
    }

    login = async (data: { email: string, password: string, rememberMe: boolean }): Promise<any> => {
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
            expiresIn: data.rememberMe ? '30d' : '1h'
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

            var expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const resetToken = nanoid();

            // Delete existed token
            await this.prismaService.forgotPasswordToken.delete({
=======
            const account = await this.prismaService.account.findUnique({
>>>>>>> 2bf9913baf2fc0da8e22d9e2152df58546163c34
                where: {
                    userId: user.id,
                }
            })
            if (account) {
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

    /**
     * @desc forgot password
     * @param email
     * @returns
     */
    async forgotPassword(email: string) {
        // Check if email is valid
        const user = await this.usersService.getByEmail(email);
        if (!user) {
            throw new BadRequestException("Email is invalid");
        }

        var expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        const resetToken = nanoid();

        // Delete existed token
        await this.prismaService.forgotPasswordToken.delete({
            where: {
                userId: user.id,
            },
        });

        // Create new token
        await this.prismaService.forgotPasswordToken.create({
            data: {
                token: resetToken,
                expires: expiryDate,
                userId: user.id,
            },
        });

        // Send password reset email.
        await this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    /**
     * @desc user reset password
     * @param newPassword
     * @param resetToken
     */
    async resetPassword(newPassword: string, resetToken: string) {
        const token = await this.prismaService.forgotPasswordToken.findUnique({
            where: {
                token: resetToken,
                expires: { gt: new Date() },
            },
        });

        if (!token) {
            throw new UnauthorizedException("Invalid link");
        }

        await this.prismaService.forgotPasswordToken.delete({
            where: {
                token: resetToken,
                expires: { gt: new Date() },
            },
        });

        // Check if token is valid
        const user = await this.usersService.getById(token.userId);
        if (!user) {
            throw new InternalServerErrorException();
        }

        // Update password
        return await this.usersService.updatePassword(user, newPassword);
    }
<<<<<<< HEAD

    async refreshAccessToken(refreshToken: string){
        try{
            const user = this.prismaService.user.findUnique({
                where: {
                    refreshToken: refreshToken,
                }
            })
            const storedRefreshToken = (await user).refreshToken;
            
            const payload = { 
                id: (await user).id, 
                username: (await user).username, 
                email: (await user).email 
            }

            if(storedRefreshToken !== refreshToken){
                throw new UnauthorizedException('Invalid refresh token');
            }
            const newAccessToken = this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: '15m',
            })

            return {
                access_token: newAccessToken,
            };
        } catch (error){
            throw new UnauthorizedException('Refresh Token expired or invalid');
        }
    }

}   
=======
}
>>>>>>> 2bf9913baf2fc0da8e22d9e2152df58546163c34
