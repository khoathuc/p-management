import { Module } from "@nestjs/common";
import { WorkspaceController } from "./workspaces.controller";
import { WorkspacesService } from "./workspaces.service";
import { PrismaModule } from "@db/prisma.module";
import { UsersModule } from "@modules/users/users.module";
import { WorkspacesFollowingService } from "./following/following.service";
import { WorkspaceInvitationController } from "./invitation.controller";
import { InvitationService } from "./invitation/invitation.service";

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [WorkspaceController, WorkspaceInvitationController],
    providers: [
        WorkspacesService,
        WorkspacesFollowingService,
        InvitationService,
    ],
    exports: [WorkspacesService],
})
export class WorkspaceModule {}
