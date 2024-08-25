import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { WorkspaceRole } from "@prisma/client";

export class CreateWorkspaceInvitationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    workspaceId: string;

	@IsBoolean()
	@IsOptional()
	viaEmail: boolean;

    @IsString()
    @IsEnum(WorkspaceRole)
    @ApiProperty()
    role: WorkspaceRole;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
}
