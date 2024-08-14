import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { PrismaModule } from '@db/prisma.module';
import { WorkspacesLoader } from './services/workspaces.loader';
import { UsersModule } from '@modules/users/users.module';
import { WorkspacesReader } from './services/workspaces.reader';


@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [WorkspaceController],
  providers: [WorkspacesService, WorkspacesLoader, WorkspacesReader],
  exports: [WorkspacesService, WorkspacesLoader, WorkspacesReader]
})
export class WorkspaceModule {}
