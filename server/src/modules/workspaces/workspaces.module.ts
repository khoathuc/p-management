import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { PrismaModule } from '@db/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController],
  providers: [WorkspacesService],
  exports: [WorkspacesService]
})
export class WorkspaceModule {}
