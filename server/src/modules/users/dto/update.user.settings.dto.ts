import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateSettingsDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string

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