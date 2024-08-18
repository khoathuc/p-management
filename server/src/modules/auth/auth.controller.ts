import { Body, Controller, Get, Param, Post, Put, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/modules/auth/models/user.model";
import { LoginDto, RegisterDto } from "src/modules/auth/dto/auth.dto";
import { ForgotPasswordDto } from "./dto/forgotpassword.dto";
import { ResetPasswordDto } from "./dto/resetpassword.dto";

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

    //TODO: Forgot Password 

    @Post('forgotpassword')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.userService.forgotPassword(forgotPasswordDto.email);
    }

    //TODO: Reset Password

    @Post('resetpassword')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        const {resetToken, newPassword} = resetPasswordDto;

        return this.userService.resetPassword(
            newPassword,
            resetToken, 
        )
    }
}