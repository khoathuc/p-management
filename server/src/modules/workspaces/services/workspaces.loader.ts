import { Injectable } from "@nestjs/common";
import { BaseDBService } from "@providers/basedb/basedb.service";

@Injectable()
export class WorkspacesLoader extends BaseDBService{
	async getAll() {
        return await this.prisma.workspace.findMany();
    }
}