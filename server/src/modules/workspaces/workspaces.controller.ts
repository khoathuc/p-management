import { Body, Controller, Get, Param, Post, Delete, Put, Patch } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create.workspace.dto';
import { UpdateWorkspaceDto } from './dto/update.workspace.dto';


@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto : CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto)
  }

  @Get()
  getAll() {
    return this.workspacesService.getAll()
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.workspacesService.getById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(id, updateWorkspaceDto)
  }

  @Delete()
  delete(@Param('id') id: string) {
    return this.workspacesService.delete(id)
  }
}
