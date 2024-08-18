import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { User, Workspace } from "@prisma/client";
import { ARR } from "@shared/array";
import { WorkspacesFollowingLoader } from "./services/loader";
import { IFollowingsService } from "@providers/followings/followings.service";
import { UsersService } from "@modules/users/users.service";

@Injectable()
export class WorkspacesFollowingService
    implements IFollowingsService<Workspace>
{
    constructor(
        private _prisma: PrismaService,
        private _usersService: UsersService
    ) {}

    loader() {
        return new WorkspacesFollowingLoader(this._prisma);
    }

    getExport(workspace: Workspace, user: User) {
        const creating = workspace.userId == user.id ? true : false;

        var ownering = false;
        if (workspace.owners.length > 0) {
            ownering = ARR.contain(workspace.owners, user.id) ? true : false;
        }

        var isMember = false;
        if (workspace.members.length > 0) {
            isMember = ARR.contain(workspace.members, user.id) ? true : false;
        }

        var isAdmin = false;
        if (workspace.admins.length > 0) {
            isAdmin = ARR.contain(workspace.admins, user.id) ? true : false;
        }

        return {
            objectId: workspace.id,
            userId: user.id,

            name: workspace.name,
            logo: workspace.logo,

            creating,
            ownering,

            isAdmin,
            isMember,

            data: workspace.data,
        };
    }

    /**
     * @desc create new workspace following
     * @param workspace
     */
    async init(workspace: Workspace) {
        // Get users
        const user_ids = ARR.merge([
            [workspace.userId],
            workspace.owners,
            workspace.members,
            workspace.members,
        ]);

        // Update following
        ARR.loop(user_ids, async (u) => {
            const user = await this._usersService.getById(u);
            if (!user) return;

            const fsExport = this.getExport(workspace, user);

            await this._prisma.workspaceFollowing.create({
                data: {
                    ...fsExport,
                },
            });
        });
    }

    /**
     * @desc update workspaces following
     * @param workspace
     */
    async sync(workspace: Workspace) {
        // Get users
        const user_ids = ARR.merge([
            [workspace.userId],
            workspace.owners,
            workspace.members,
            workspace.members,
        ]);

        // Update following
        ARR.loop(user_ids, async (u) => {
            const user = await this._usersService.getById(u);
            if (!user) return;

            const fsExport = this.getExport(workspace, user);

            await this._prisma.workspaceFollowing.update({
                data: {
                    ...fsExport,
                },
                where: {
                    objectId_userId: {
                        objectId: workspace.id,
                        userId: user.id,
                    },
                },
            });
        });
    }
    
    
    /**
     * @desc remove workspaces following
     * @param workspace
     */
    async remove(workspace: Workspace) {
        // Get users
        const user_ids = ARR.merge([
            [workspace.userId],
            workspace.owners,
            workspace.members,
            workspace.members,
        ]);

        // Remove following
        ARR.loop(user_ids, async (u) => {
            const user = await this._usersService.getById(u);
            if (!user) return;

            await this._prisma.workspaceFollowing.delete({
                where: {
                    objectId_userId: {
                        objectId: workspace.id,
                        userId: user.id,
                    },
                },
            });
        });
    }
}
