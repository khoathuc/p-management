import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    getAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	getById(id: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {id},
		});
	}

	async getByEmail(email: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {email},
		})
	}
}
