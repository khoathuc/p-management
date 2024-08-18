import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateSettingsDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string
    
    @IsOptional()
    @IsEmail()
	@IsNotEmpty()
    @ApiProperty()
    email: string

	@IsOptional()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    currentPassword: string;

    @IsOptional()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    newPassword: string;

    @IsOptional()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    confirmPassword: string;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    location: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    status: number;
    
}