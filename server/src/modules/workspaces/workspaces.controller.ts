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
} from "@nestjs/common";
import { HttpMessage } from "@common/constants/http.message";
import { WorkspacesService } from "./workspaces.service";
import { CreateWorkspaceDto } from "./dto/create.workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update.workspace.dto";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UsersService } from "@modules/users/users.service";
import { WorkspacesLoader } from "./services/workspaces.loader";
import { WorkspacesReader } from "./services/workspaces.reader";

@Controller("workspaces")
@ApiTags("workspaces")
export class WorkspaceController {
    constructor(
        private readonly workspacesService: WorkspacesService,
        private readonly workspacesLoader: WorkspacesLoader,
        private readonly workspacesReader: WorkspacesReader,
        private readonly usersService: UsersService
    ) {}

    @Post()
    @ApiOperation({
        summary: "Create new workspace",
        description: "Create new workspace",
    })
    async create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
        try {
            const {userId} = createWorkspaceDto;
    
            //validate user
            //check if user is authenticated.
            //TODO: replace validate user by current user
            const user = await this.usersService.getById(userId);
            if(!user){
                throw new UnauthorizedException(HttpMessage.INVALID_DATA);
            }
    
            //create new workspace
            const workspace = await this.workspacesReader.create(createWorkspaceDto);
    
            //on created workspace
            // this.workspacesService.on(workspace).created();
    
            //return workspace
            // return workspace;
            return true;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);            
        }
    }

    @Get()
    @ApiOperation({
        summary: "Get all workspaces",
        description: "Get all workspaces",
    })
    async getAll() {
        return await this.workspacesLoader.getAll();
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
    getById(@Param("id") id: string) {
        return this.workspacesLoader.getById(id);
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Update a workspace by id",
        description: "Update a workspace by id",
    })
    update(
        @Param("id") id: string,
        @Body() updateWorkspaceDto: UpdateWorkspaceDto
    ) {
        return this.workspacesService.update(id, updateWorkspaceDto);
    }

    @Delete()
    @ApiOperation({
        summary: "Delete a workspace",
        description: "Delete a workspace by id",
    })
    delete(@Param("id") id: string) {
        return this.workspacesService.delete(id);
    }
}
