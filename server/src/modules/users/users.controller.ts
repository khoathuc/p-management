import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

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
}
