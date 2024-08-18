import { Controller, Body, Post, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import AuthUser from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('create')
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.userService.create(body);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<User> {
        const user = this.userService.deleteById(id);
        return user;
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@AuthUser() user: User) {
        return user;
    }

}