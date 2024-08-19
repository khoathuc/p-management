import { Body, Controller, Res, Get, Post, UseGuards, Req } from "@nestjs/common";
import { User } from 'src/modules/users/interfaces/user.interface';
import { LoginDto, RegisterDto } from "src/modules/auth/dto/auth.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";
import { AuthService } from "./auth.service";
import { ForgotPasswordDto } from "./dto/forgotpassword.dto";
import { ResetPasswordDto } from "./dto/resetpassword.dto";

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

    //TODO: Forgot Password 

    @Post('forgotpassword')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    //TODO: Reset Password

    @Post('resetpassword')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        const { resetToken, newPassword } = resetPasswordDto;

        return this.authService.resetPassword(
            newPassword,
            resetToken,
        )
    }
}