import { PrismaService } from "@db/prisma.service";
import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { get } from "http";
import { UpdateSettingsDto } from "./dto/update.user.settings.dto";
import { hash, compare } from 'bcrypt';

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

	/**
     * @desc update user settings
	 * @param {string} id
     * @param {updateSettingsDto} data
     * @returns {Promise<User>}
     */
	async update(id: string, data: UpdateSettingsDto): Promise<User> {
		return this.prisma.user.update({
			where: {id}, 
			data
		})
	}

	/**
     * @desc upload avatar
	 * @param {string} id
     * @param {string} avatarPath
     * @returns {Promise<User>}
     */
	async uploadAvatar(id: string, avatarPath: string): Promise<User> {
		return this.prisma.user.update({
			where: {id},
			data: {avatar: avatarPath}
		})
	}
}

