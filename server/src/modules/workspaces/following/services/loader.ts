import { PrismaClient, WorkspaceFollowing } from "@prisma/client";

export class WorkspacesFollowingLoader {
    constructor(private _prisma: PrismaClient) {}

    /**
     * @desc get all workspaces
     * @returns
     */
    async getAll() {
        return await this._prisma.workspaceFollowing.findMany();
    }

    /**
     * @desc get workspace by id
     * @param string id
     * @returns._prisma);
     */
    async getById(id: string): Promise<WorkspaceFollowing> {
        return await this._prisma.workspaceFollowing.findUnique({
            where: { id },
        });
    }
}
