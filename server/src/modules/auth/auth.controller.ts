import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { User } from "src/modules/auth/models/user.model";
import { LoginDto, RegisterDto } from "src/modules/auth/dto/auth.dto";

@Controller('user')
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

}