import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/modules/users/interfaces/user.interface';
import { LoginDto, RegisterDto } from 'src/modules/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {


    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

    register = async (registerDto: RegisterDto): Promise<User> => {
        const existingUser = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { email: registerDto.email },
                    { username: registerDto.username }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === registerDto.email) {
                throw new HttpException({ message: "This email has been used." }, HttpStatus.BAD_REQUEST);
            }
            if (existingUser.username === registerDto.username) {
                throw new HttpException({ message: "This username has been used." }, HttpStatus.BAD_REQUEST);
            }
        }

        const hashPassword = await hash(registerDto.password, 10);

        const res = await this.prismaService.user.create({
            data: { ...registerDto, password: hashPassword }
        })

        return res;
    }

    login = async (data: { email: string, password: string }): Promise<any> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }

        })

        if (!user) {
            throw new HttpException({ message: "Account is not exist." }, HttpStatus.UNAUTHORIZED);
        }
        const verify = await compare(data.password, user.password);

        if (!verify) {
            throw new HttpException({ message: "Password is incorrect." }, HttpStatus.UNAUTHORIZED);
        }
        const payload = { id: user.id, username: user.username, email: user.email }
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '1h'
        })
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: '7d'
        })
        return {
            accessToken,
            refreshToken
        }
    }
}