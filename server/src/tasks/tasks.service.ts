import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findOneById(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  getAllTasks() {
    return this.prisma.task.findMany();
  }

  create(createTaskDto: CreateTaskDto) {
    const { name } = createTaskDto;
    return this.prisma.task.create({
      data: {
        name,
      },
    });
  }
}
