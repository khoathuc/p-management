import { PrismaService } from "@db/prisma.service";
import { HttpException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";


@Injectable()
export class WorkspacesService {
	constructor(private prisma: PrismaService){}
    
    async update(id: string, data: Prisma.WorkspaceUpdateInput) {
        // const Workspace = await this..getById(id);
        // if (!Workspace) throw new HttpException("Workspace Not Found", 404);

        // if (data.name) {
        //     const Workspace = await this.prisma.workspace.findUnique({
        //         where: { name: data.name as string },
        //     });

        //     if (Workspace)
        //         throw new HttpException("WorkspaceName already taken", 400);
        // }

        // return this.prisma.workspace.update({
        //     where: { id },
        //     data,
        // });
    }

    async delete(id: string) {
        const Workspace = await this.prisma.workspace.findUnique({
            where: { id },
        });

        if (!Workspace) throw new HttpException("Workspace Not Found", 404);
        return this.prisma.workspace.delete;
    }
}
