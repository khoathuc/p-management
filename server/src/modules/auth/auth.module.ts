import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "@db/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/providers/email/mail.service";
import { UsersService } from "@modules/users/users.service";
import { GoogleStrategy } from "src/providers/google/google.strategy";
import { SessionSerializer } from "src/providers/google/serializer";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtService, GoogleStrategy, JwtStrategy, LocalStrategy, SessionSerializer, EmailService, UsersService]
})

export class AuthModule { };