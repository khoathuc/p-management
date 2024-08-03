import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/tasks')
  async getAll(){
    return await this.tasksService.getAllTasks();
  }


  @Post('')
  async create(@Body() createTaskDto: CreateTaskDto){
    return await this.tasksService.create(createTaskDto);
  }
}
