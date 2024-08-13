import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { PrismaModule } from '@db/prisma.module';
import { WorkspacesLoader } from './services/workspaces.loader';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';


@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [WorkspaceController],
  providers: [WorkspacesService, WorkspacesLoader],
  exports: [WorkspacesService, WorkspacesLoader]
})
export class WorkspaceModule {}
