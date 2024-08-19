import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty, isEmail, IsEnum, IsString } from 'class-validator';
export class RegisterDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @MinLength(5)
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
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
