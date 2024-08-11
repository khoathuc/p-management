import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "@modules/auth/models/user.model";
import { LoginDto, RegisterDto } from "@modules/auth/dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('users')
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