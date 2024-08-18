import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@db/prisma.service";
import { Prisma, Workspace } from "@prisma/client";
import { CreateWorkspaceDto } from "./dto/create.workspace.dto";
import { Workspace as WorkspaceModel } from "@prisma/client";
import { UpdateWorkspaceDto } from "./dto/update.workspace.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class WorkspacesService {
    constructor(private prisma: PrismaService) {}

    /**
     * @desc create workspace
     * @param {CreateWorkspaceDto} data
     * @returns {Promise<WorkspaceModel>}
     * @throws {ConflictException}
     */
    async create(data: CreateWorkspaceDto): Promise<WorkspaceModel> {
        if (data.name) {
            const workspace = await this.prisma.workspace.findUnique({
                where: { name: data.name as string },
            });

            if (workspace)
                throw new ConflictException("Workspace's name already taken");
        }

        return this.prisma.workspace.create({
            data: {
                ...data,
            },
        });
    }

    /**
     * @desc get all workspaces 
     * @returns {Promise<Workspace[]>}
     * @throws {NotFoundException}
     */
    async getAll(): Promise<Workspace[]> {
        const workspaces = await this.prisma.workspace.findMany();
        if (!workspaces.length)
            throw new NotFoundException("Workspace Not Found");
        return workspaces;
    }

    /**
     * @desc get workspace by id
     * @param {string} id
     * @returns {Promise<Workspace>}
     * @throws {NotFoundException}
     */
    async getById(id: string): Promise<Workspace> {
        const workspace = await this.prisma.workspace.findUnique({
            where: { id },
        });

        if (!workspace) throw new NotFoundException("Workspace Not Found");
        return workspace;
    }

     /**
     * @desc update workspace by id
     * @param {string} id
     * @param {UpdateWorkspaceDto} data
     * @returns {Promise<Workspace>}
     * @throws {NotFoundException}
     * @throws {ConflictException}
     */
    async update(id: string, data: UpdateWorkspaceDto) {
        const workspace = await this.getById(id);
        if (!workspace) throw new NotFoundException("Workspace Not Found");

        if (data.name) {
            const workspace = await this.prisma.workspace.findUnique({
                where: { name: data.name as string },
            });

            if (workspace)
                throw new ConflictException("Workspace's name already taken");
        }

        return this.prisma.workspace.update({
            where: { id },
            data,
        });
    }

    /**
     * @desc delete workspace by id
     * @param {string} id
     * @returns {Promise<Workspace>}
     * @throws {NotFoundException}
     */
    async delete(id: string): Promise<Workspace> {
        const workspace = await this.prisma.workspace.findUnique({
            where: { id },
        });

        if (!workspace) throw new NotFoundException("Workspace Not Found");
        return this.prisma.workspace.delete({
            where: {id}
        });
    }
}
