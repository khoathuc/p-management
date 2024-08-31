import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { WorkspacesLoader } from "./services/loader";
import { WorkspacesWriter } from "./services/writer";
import { WorkspacesFollowingService } from "./following/following.service";
import { Workspace } from "@prisma/client";

@Injectable()
export class WorkspacesService {
    constructor(private _prisma: PrismaService, private _fs: WorkspacesFollowingService) {}

    loader() {
        return new WorkspacesLoader(this._prisma);
    }

    writer() {
        return new WorkspacesWriter(this._prisma);
    }

    fs(){
        return this._fs;
    }

    /**
     * @desc delete a workspace
     * @param {Workspace} workspace
     * @returns
     */
    async delete(workspace: Workspace) {
        return await this._prisma.workspace.delete({
            where: { id: workspace.id },
        });
    }
}
