import { Controller, Get, Param, Patch, Body, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateSettingsDto } from './dto/update.user.settings.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { promises as fs } from 'fs';
import { apiFile } from '@decorators/api.file.decorator';
import { fileMimetypeFilter } from '@common/filters/file.mimetype.filter';
import { ParseFile } from '@common/pipes/parse.file.pipe';

@Controller('users')
@ApiTags("users")
export class UsersController {
	constructor(private readonly usersService: UsersService){}
	
	@Get()
	@ApiOperation({
		summary: "Get all users",
		description: "Get all users"
	})
    getAll(){
        return this.usersService.getAll();
    }

	@Get(":id")
	@ApiOperation({
		summary: "Get user by id",
		description: "Get user by id"
	})
	getById(@Param("id") id: string){
		return this.usersService.getById(id);
	}

	@Patch(":id/settings")
	updateSettings(@Param("id") id: string, @Body() data: UpdateSettingsDto) {
		return this.usersService.update(id, data)
	}

	@Post(":id/avatar")
	@apiFile('avatar', true, { fileFilter: fileMimetypeFilter('image')})
	uploadAvatar(@Param('id') id: string, @UploadedFile(ParseFile) file: Express.Multer.File) {
		console.log(file);
		return this.usersService.uploadAvatar(id, file.filename)
	}
}