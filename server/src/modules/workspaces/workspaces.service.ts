import { PrismaService } from "@db/prisma.service";
import { HttpException, Injectable } from "@nestjs/common";
import { WorkspacesLoader } from "./services/loader";
import { WorkspacesReader } from "./services/reader";


@Injectable()
export class WorkspacesService {
	constructor(private _prisma: PrismaService){}
    
    loader(){
        return new WorkspacesLoader(this._prisma);
    }


    reader(){
        return new WorkspacesReader(this._prisma);
    }
    

    async delete(id: string) {
        const workspace = await this._prisma.workspace.findUnique({
            where: { id },
        });

        if (!workspace) throw new HttpException("Workspace Not Found", 404);
        return this._prisma.workspace.delete;
    }
}
