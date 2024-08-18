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
     * @throws {BadRequestException}
     */
	async updateSettings(id: string, data: UpdateSettingsDto): Promise<User> {
		const { username, email, currentPassword, confirmPassword, 
				newPassword, title, location, status } = data
		const updateData: any = {};

		if(status) {
			updateData.status = status;
		}

		if(title) {
			updateData.title = title;
		}

		if(location) {
			updateData.location = location;
		}
		
		if(username) {
			updateData.username = username;
		}

		if(currentPassword && confirmPassword && newPassword) {

			const user = await this.getById(id)
			const isPasswordMatch = await compare(currentPassword, user.password);
			
			if (!isPasswordMatch)
				throw new BadRequestException('Current password is incorrect');

			if(newPassword !== confirmPassword)
				throw new BadRequestException('New password and confirm password do not match');

			const hashPassword = await hash(newPassword, 10)
			updateData.password = hashPassword
		}

		return this.prisma.user.update({
			where: {id}, 
			data: updateData
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

