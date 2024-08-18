import { Controller, Get, Param, Patch, Body, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateSettingsDto } from './dto/update.user.settings.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { promises as fs } from 'fs';

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
		return this.usersService.updateSettings(id, data)
	}

	@Patch(":id/avatar")
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                callback(null, filename);
            }
        }),

		fileFilter: (req, file, callback) => {
			const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
			if (!allowedTypes.includes(file.mimetype)) {
				return callback(new BadRequestException('Only image files are allowed!'), false);
			}
			callback(null, true);
		}
     }))
    async uploadAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        if(!file) throw new BadRequestException("No file uploaded");

		const user = await this.usersService.getById(id);
		if (user.avatar) {
			const oldAvatarPath = join(__dirname, '..', 'uploads', user.avatar);
			await fs.unlink(oldAvatarPath); 
		 }

		return this.usersService.uploadAvatar(id, file.filename)
    }
}