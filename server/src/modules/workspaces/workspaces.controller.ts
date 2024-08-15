import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    UnauthorizedException,
    HttpException,
    HttpStatus,
    BadRequestException,
} from "@nestjs/common";
import { HttpMessage } from "@common/constants/http.message";
import { WorkspacesService } from "./workspaces.service";
import { CreateWorkspaceDto } from "./dto/create.workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update.workspace.dto";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UsersService } from "@modules/users/users.service";

@Controller("workspaces")
@ApiTags("workspaces")
export class WorkspaceController {
    constructor(
        private readonly workspacesService: WorkspacesService,
        private readonly usersService: UsersService
    ) {}

    @Post()
    @ApiOperation({
        summary: "Create new workspace",
        description: "Create new workspace",
    })
    async create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
        try {
            const { userId } = createWorkspaceDto;

            //validate user
            //check if user is authenticated.
            //TODO: replace validate user by current user
            const user = await this.usersService.getById(userId);
            if (!user) {
                throw new UnauthorizedException(HttpMessage.INVALID_DATA);
            }

            //create new workspace
            const workspace = await this.workspacesService
                .reader()
                .create(createWorkspaceDto);

            //on created workspace
            // this.workspacesService.on(workspace).created();

            //return workspace
            // return workspace;
            return workspace;
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get()
    @ApiOperation({
        summary: "Get all workspaces",
        description: "Get all workspaces",
    })
    async getAll() {
        try {
            return await this.workspacesService.loader().getAll();
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get workspace by id",
        description: "Get workspace by id",
    })
    @ApiParam({
        name: "id",
        type: "string",
    })
    async getById(@Param("id") id: string) {
        try {
            return await this.workspacesService.loader().getById(id);
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Update a workspace by id",
        description: "Update a workspace by id",
    })
    async update(
        @Param("id") id: string,
        @Body() updateWorkspaceDto: UpdateWorkspaceDto
    ) {
        try {
            const isWorkspaceExisted = await this.workspacesService
                .loader()
                .getById(id);
            if (!isWorkspaceExisted) {
                throw new BadRequestException(HttpMessage.INVALID_DATA);
            }

            //update workspace
            const workspace = await this.workspacesService
                .reader()
                .update(id, updateWorkspaceDto);

            return workspace;
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete()
    @ApiOperation({
        summary: "Delete a workspace",
        description: "Delete a workspace by id",
    })
    async delete(@Param("id") id: string) {
        try {
            const isWorkspaceExisted = await this.workspacesService
                .loader()
                .getById(id);
            if (!isWorkspaceExisted) {
                throw new BadRequestException(HttpMessage.INVALID_DATA);
            }

            return await this.workspacesService.delete(id);
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
