import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository, // @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {} // private taskRepository: Repository<Task>,

  async getTaskById(id: number): Promise<Task> {
    console.log(this.taskRepository.findOne);
    const found = await this.taskRepository.findOne({ where: { id } }); //.findOne({ where: { id } }); // or .findOneBy({ id });

    if (!found) throw new NotFoundException(`Task with id ${id} was not found`);
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
}
