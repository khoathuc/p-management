import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getById(id: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {id},
		});
	}
}
