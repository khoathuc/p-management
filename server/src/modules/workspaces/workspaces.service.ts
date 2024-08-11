import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { Workspace as WorkspaceModel } from "@prisma/client";

@Injectable()
export class WorkspacesService {
    constructor(private prisma: PrismaService) {}

    async createWorkspace(data: CreateWorkspaceDto): Promise<WorkspaceModel> {
        if (data.name) {
            const workspace = await this.prisma.workspace.findUnique({
                where: { name: data.name as string },
            });

            if (workspace)
                throw new HttpException("Workspace's name already taken", 400);
        }

        return this.prisma.workspace.create({
            data: {
                ...data,
            },
        });
    }

    async getWorkspace() {
        const Workspace = await this.prisma.workspace.findMany();
        if (!Workspace.length)
            throw new HttpException("Workspace Not Found", 404);
        return Workspace;
    }

    async getWorkspaceById(id: string) {
        const Workspace = await this.prisma.workspace.findUnique({
            where: { id },
        });

        if (!Workspace) throw new HttpException("Workspace Not Found", 404);
        return Workspace;
    }

    async updateWorkspace(id: string, data: Prisma.WorkspaceUpdateInput) {
        const Workspace = await this.getWorkspaceById(id);
        if (!Workspace) throw new HttpException("Workspace Not Found", 404);

        if (data.name) {
            const Workspace = await this.prisma.workspace.findUnique({
                where: { name: data.name as string },
            });

            if (Workspace)
                throw new HttpException("WorkspaceName already taken", 400);
        }

        return this.prisma.workspace.update({
            where: { id },
            data,
        });
    }

    async deleteWorkspace(id: string) {
        const Workspace = await this.prisma.workspace.findUnique({
            where: { id },
        });

        if (!Workspace) throw new HttpException("Workspace Not Found", 404);
        return this.prisma.workspace.delete;
    }
}
