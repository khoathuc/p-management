import { IsEmail, MinLength, IsNotEmpty, isEmail } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    status: number;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}