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
  createTask(@Body() task: Task) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task) {
    const updatedTask = this.tasksService.updateTask(id, task);
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
