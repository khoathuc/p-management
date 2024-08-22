import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    HttpStatus,
    HttpCode,
} from "@nestjs/common";
import { WorkspacesService } from "./workspaces.service";
import { CreateWorkspaceDto } from "./dto/create.workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update.workspace.dto";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@Controller("workspaces")
@ApiTags("workspaces")
export class WorkspaceController {
    constructor(private readonly workspacesService: WorkspacesService) {}

    @Post()
    @ApiOperation({
        summary: "Create new workspace",
        description: "Create new workspace",
    })
    create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
        return this.workspacesService.create(createWorkspaceDto);
    }

    @Get()
    @ApiOperation({
        summary: "Get all workspaces",
        description: "Get all workspaces",
    })
    getAll() {
        return this.workspacesService.getAll();
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
        return this.workspacesService.getById(id);
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
