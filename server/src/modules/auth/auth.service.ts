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
}
