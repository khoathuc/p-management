import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { WorkspacesLoader } from "./services/loader";
import { WorkspacesWriter } from "./services/writer";
import { WorkspacesFollowingService } from "./following/following.service";
import { Workspace } from "@prisma/client";
import { WorkspacesAcl } from "./services/acl";

@Injectable()
export class WorkspacesService {
    constructor(
        private _prisma: PrismaService,
        private _fs: WorkspacesFollowingService,
    ) {}


    /**
     * @desc return workspace loader
     * @returns {WorkspacesLoader}
     */
    loader() {
        return new WorkspacesLoader(this._prisma);
    }

    /**
     * @desc return workspace writer
     * @returns {WorkspacesWriter}
     */
    writer() {
        return new WorkspacesWriter(this._prisma);
    }
    
    /**
     * @desc return workspace acl
     * @param workspace 
     * @returns {WorkspacesAcl}
     */
    acl(workspace: Workspace) {
        return new WorkspacesAcl(workspace);
    }

    /**
     * @desc return workspace following service
     * @returns {WorkspacesFollowingService}
     */
    fs() {
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
