import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { PrismaModule } from '@db/prisma.module';
import { UsersModule } from '@modules/users/users.module';


@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [WorkspaceController],
  providers: [WorkspacesService],
  exports: [WorkspacesService]
})
export class WorkspaceModule {}
