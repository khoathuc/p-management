import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';


@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createWorkspace(@Body() createWorkspaceData : CreateWorkspaceDto) {
    return this.workspaceService.createWorkspace(createWorkspaceData)
  }

  @Get()
  getWorkspace() {
    return this.workspaceService.getWorkspace()
  }

  @Get(':id')
  getWorkspaceById(@Param('id') id: string) {
    return this.workspaceService.getWorkspaceById(id)
  }

  @Patch(':id')
  updateWorkspace(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.updateWorkspace(id, updateWorkspaceDto)
  }

  @Delete()
  deleteWorkspace(@Param('id') id: string) {
    return this.workspaceService.deleteWorkspace(id)
  }
}
