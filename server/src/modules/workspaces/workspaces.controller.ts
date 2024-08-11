import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';


@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  createWorkspace(@Body() createWorkspaceDto : CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(createWorkspaceDto)
  }

  @Get()
  getWorkspace() {
    return this.workspacesService.getWorkspace()
  }

  @Get(':id')
  getWorkspaceById(@Param('id') id: string) {
    return this.workspacesService.getWorkspaceById(id)
  }

  @Patch(':id')
  updateWorkspace(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.updateWorkspace(id, updateWorkspaceDto)
  }

  @Delete()
  deleteWorkspace(@Param('id') id: string) {
    return this.workspacesService.deleteWorkspace(id)
  }
}
