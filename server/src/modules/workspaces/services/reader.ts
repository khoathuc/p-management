import { Injectable } from "@nestjs/common";
import { Workspace } from "@prisma/client";
import { CreateWorkspaceDto } from "../dto/create.workspace.dto";
import { WorkspacesLoader } from "./workspaces.loader";
import { PrismaService } from "@db/prisma.service";
import { UpdateWorkspaceDto } from "../dto/update.workspace.dto";

export class WorkspacesReader {
    constructor(
        private _prisma: PrismaService,
    ) {
		this._prisma = _prisma;
	}

    /**
     * @desc create new workspace
     * @param data
     * @returns Workspace
     */
    async create(data: CreateWorkspaceDto): Promise<Workspace> {

        return this._prisma.workspace.create({
            data: {
                ...data,
            },
        });
    }
    
	
	/**
     * @desc update workspace
	 * @param {string} id
     * @param {UpdateWorkspaceDto} data
     */
    async update(id, data: UpdateWorkspaceDto): Promise<Workspace> {

        return this._prisma.workspace.update({
            data: {
                ...data,
            },
			where: {id}
        });
    } 
}
