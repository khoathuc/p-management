import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtService, LocalStrategy, JwtStrategy]
})

export class AuthModule { };