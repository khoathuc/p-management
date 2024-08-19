import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@db/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async create(body: CreateUserDto): Promise<User> {
        const existing = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { email: body.email },
                    { username: body.username }
                ]
            }
        });

        if (existing) {
            if (existing.email === body.email) {
                throw new HttpException({ message: "This email has been used." }, HttpStatus.BAD_REQUEST);
            }
            if (existing.username === body.username) {
                throw new HttpException({ message: "This username has been used." }, HttpStatus.BAD_REQUEST);
            }
        }

        const hashPassword = await hash(body.password, 10);
        const res = await this.prismaService.user.create({
            data: {
                ...body,
                password: hashPassword
            }
        });

        return res;
    }

    async getAllUser(): Promise<User[]> {
        const users = await this.prismaService.user.findMany();
        return users;
    }

    async getByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;

    }
    async deleteByEmail(userEmail: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: userEmail,
            },
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        await this.prismaService.user.delete({
            where: {
                email: userEmail,
            }
        });
        return user;
    }
    async getById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;

    }
    async deleteById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        await this.prismaService.user.delete({
            where: {
                id: id,
            }
        });
        return user;
    }
}
