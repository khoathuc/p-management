import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "@db/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/providers/email/mail.service";
import { UsersService } from "@modules/users/users.service";
@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtService, MailService, UsersService]
})

export class AuthModule { };