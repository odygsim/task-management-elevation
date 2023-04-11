import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getFilteredTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    let tasks: Task[] = await this.getAllTasks();

    if (status) tasks = tasks.filter((task) => task.status === status);

    if (search)
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) throw new NotFoundException(`Task with id ${id} was not found`);

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const found = await this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);

    console.log('here');
    task.status = status;

    return task;
  }
}
