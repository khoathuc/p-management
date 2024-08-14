import { Injectable } from "@nestjs/common";
import { Workspace } from "@prisma/client";
import { CreateWorkspaceDto } from "../dto/create.workspace.dto";
import { WorkspacesLoader } from "./workspaces.loader";
import { PrismaService } from "@db/prisma.service";

@Injectable()
export class WorkspacesReader {
    constructor(
        private prisma: PrismaService,
        private readonly workspacesLoader: WorkspacesLoader
    ) {}

    /**
     * @desc create new workspace
     * @param data
     * @returns
     */
    async create(data: CreateWorkspaceDto): Promise<Workspace> {
        //validate workspace's name
        const name = await this.readName(data);

        return this.prisma.workspace.create({
            data: {
                ...data,
            },
        });
    }

    private async readName(data: CreateWorkspaceDto) {
        const { name } = data;

        const isNameExisted = await this.workspacesLoader.getByName(name);
		if(isNameExisted) {
			throw new Error("Workspace's name already exists");
		}

		return name;
    }
}
