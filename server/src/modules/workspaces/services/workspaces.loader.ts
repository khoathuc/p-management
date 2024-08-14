import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Workspace } from "@prisma/client";

@Injectable()
export class WorkspacesLoader{
	constructor(private prisma: PrismaService){}

	/**
	 * @desc get all workspaces
	 * @returns 
	 */
	async getAll() {
        return await this.prisma.workspace.findMany();
    }


	/**
	 * @desc get workspace by id
	 * @param string id
	 * @returns 
	 */
	async getById(id: string): Promise<Workspace> {
        return await this.prisma.workspace.findUnique({
            where: { id },
        });
    }
	
	
	/**
	 * @desc get workspace by name
	 * @param string name
	 * @returns 
	 */
	async getByName(name: string): Promise<Workspace> {
        return await this.prisma.workspace.findUnique({
            where: { name },
        });
    }
}