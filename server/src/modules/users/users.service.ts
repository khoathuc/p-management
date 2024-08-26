import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async getById(id: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }

    /**
     * @desc get users by ids
     * @return {User[]}
     */
    async getByIds(ids: string[]): Promise<User[]> {
        return await this.prisma.user.findMany({ where: { id: { in: ids } } });
    }
}
