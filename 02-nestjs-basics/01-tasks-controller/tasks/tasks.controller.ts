import {
  Res,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Post()
  async createTask(@Body() task: Task) {
    const createdTask = await this.tasksService.createTask(task);
    if (!createdTask) {
      throw new HttpException("Task is not correct", HttpStatus.BAD_REQUEST);
    }
    return createdTask;
  }

  @Patch(":id")
  async updateTask(@Param("id") id: string, @Body() task: Task) {
    const updatedTask = await this.tasksService.updateTask(id, task);
    if (updatedTask === null) {
      throw new HttpException("Task is not correct", HttpStatus.BAD_REQUEST);
    }

    if (!updatedTask) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    return updatedTask;
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    const task = this.tasksService.deleteTask(id);
    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    return task;
  }
}
