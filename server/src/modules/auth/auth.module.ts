import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "@db/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { GoogleStrategy } from "src/providers/google/google.strategy";
import { SessionSerializer } from "src/providers/google/serializer";
@Module({
    controllers: [AuthController],
    providers: [
        AuthService, 
        PrismaService, 
        JwtService, 
        GoogleStrategy,
        SessionSerializer,
    ]
})

export class AuthModule { };