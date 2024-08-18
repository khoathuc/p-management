import { Body, Controller, Res, Get, Post, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { User } from 'src/modules/users/interfaces/user.interface';
import { LoginDto, RegisterDto } from "src/modules/auth/dto/auth.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    register(@Body() body: RegisterDto): Promise<User> {
        return this.authService.register(body)
    }

    @Post('/login')
    @UseGuards(LocalGuard)
    login(@Body() body: LoginDto): Promise<any> {
        return this.authService.login(body);
    }

}