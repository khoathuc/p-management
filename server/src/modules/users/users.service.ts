import { PrismaService } from "@db/prisma.service";
import { AuthPayload } from "@interfaces/auth.payload";
import { RegisterDto } from "@modules/auth/dto/register.dto";
import { Injectable } from "@nestjs/common";
import { User, UserStatus } from "@prisma/client";
import { Crypt } from "@shared/crypt";
import { hash, compare } from "bcrypt";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    /**
     * @desc release user payload
     */
    releasePayload(user: User): AuthPayload{
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
        };
    }
    /**
     * @desc get all users
     * @returns 
     */
    async getAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }


    /**
     * @desc get user by id
     * @param id 
     * @returns 
     */
    async getById(id: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }


    /**
     * @desc get user by email.
     * @param email 
     * @returns 
     */
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


    /**
     * @desc get user by username or email.
     * @returns 
     */
    async getByEmailOrUsername({ email, username }): Promise<User> {
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
    }


    /**
     * @desc create new user
     */
    async create(data: RegisterDto): Promise<User> {
        const hashedPassword = await Crypt.hash(data.password, 10);
        
        return await this.prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: hashedPassword,
                status: UserStatus.Active,
                emailVerified: false
            }
        })
    }


    /**
     * @desc user update password
     */
    async updatePassword(user: User, newPassword: string){
        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: await Crypt.hash(newPassword, 10),
            },
        });
    }


    /**
     * @desc delete user by id
     * @param id 
     * @returns 
     */
    async deleteById(id: string) {
        return await this.prisma.user.delete({
            where: {
                id: id,
            }
        });
    }
}
