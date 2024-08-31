import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";
import AuthUser from "@decorators/auth.decorator";
import { JwtAuthGuard } from "@guards/jwt.guard";

@Controller("users")
@ApiTags("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({
        summary: "Get all users",
        description: "Get all users",
    })
    async getAll() {
        try {
            return await this.usersService.getAll();
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get user by id",
        description: "Get user by id",
    })
    async getById(@Param("id") id: string) {
        try {
            return await this.usersService.getById(id);
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete(":id")
    /**
     * TODO: add admin permission
     */
    async deleteById(@Param("id") id: string): Promise<User> {
        try {
            const user = await this.usersService.getById(id);

            if (!user) {
                throw new BadRequestException("User not found");
            }

            return await this.usersService.deleteById(id);
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get("/me")
    @UseGuards(JwtAuthGuard)
    getMe(@AuthUser() user: User) {
        return user;
    }
}
