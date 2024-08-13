import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseDBService{
	constructor(public prisma: PrismaService) {}
}