import { PrismaClient, Workspace } from "@prisma/client";

export class WorkspacesLoader {
    constructor(private _prisma: PrismaClient) {
        this._prisma = _prisma;
    }

    /**
     * @desc get all workspaces
     * @returns
     */
    async getAll() {
        return await this._prisma.workspace.findMany();
    }

    /**
     * @desc get workspace by id
     * @param string id
     * @returns
     */
    async getById(id: string): Promise<Workspace> {
        return await this._prisma.workspace.findUnique({
            where: { id },
        });
    }
}
