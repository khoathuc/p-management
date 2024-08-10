import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateWorkspaceDto {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    logo?: string;

    @IsArray()
    @IsString({ each: true })
    members: string[];

    @IsArray()
    @IsString({ each: true })
    owners: string[];

    @IsArray()
    @IsString({ each: true })
    admins: string[];
}