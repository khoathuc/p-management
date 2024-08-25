import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "@db/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/providers/email/mail.service";
import { UsersService } from "@modules/users/users.service";
@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtService, EmailService, UsersService]
})

export class AuthModule { };