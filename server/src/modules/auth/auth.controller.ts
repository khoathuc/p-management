import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/modules/auth/models/user.model";
import { LoginDto, RegisterDto } from "src/modules/auth/dto/auth.dto";
import { GoogleAuthGuard } from "src/providers/google/guards";

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: AuthService) { }

    @Get()
    getUser(): Promise<User[]> {
        return this.userService.getUser();
    }

    @Post('register')
    register(@Body() body: RegisterDto): Promise<User> {
        return this.userService.register(body)
    }

    @Post('login')
    login(@Body() body: LoginDto): Promise<any> {
        return this.userService.login(body)
    }

    @Get('/:username')
    detailUser(@Param('username') username: string): Promise<User> {
        return this.userService.detailUser(username);

    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {
        return { msg: 'Google Login' } 
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleRedirect() {
        return { msg: 'Google Redirect' }
    }
}