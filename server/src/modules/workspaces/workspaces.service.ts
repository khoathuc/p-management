import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateWorkspaceDto } from "./dto/create.workspace.dto";
import { Workspace as WorkspaceModel } from "@prisma/client";
import { BaseDBService } from "@providers/basedb/basedb.service";

@Injectable()
export class WorkspacesService extends BaseDBService {

    async create(data: CreateWorkspaceDto): Promise<WorkspaceModel> {
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

    async getAll() {
        return await this.prisma.workspace.findMany();
    }

    async getById(id: string) {
        const Workspace = await this.prisma.workspace.findUnique({
            where: { id },
        });

        if (!Workspace) throw new HttpException("Workspace Not Found", 404);
        return Workspace;
    }

    async update(id: string, data: Prisma.WorkspaceUpdateInput) {
        const Workspace = await this.getById(id);
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

    async delete(id: string) {
        const Workspace = await this.prisma.workspace.findUnique({
            where: { id },
        });

        if (!Workspace) throw new HttpException("Workspace Not Found", 404);
        return this.prisma.workspace.delete;
    }
}
