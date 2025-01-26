import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ObjectId } from "mongoose";
import { ObjectIDPipe } from "../objectid/objectid.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const createdTask = await this.tasksService.create(createTaskDto);

    if (createdTask instanceof Error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: createdTask.name,
          message: createdTask.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return createdTask;
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ObjectIDPipe) id: ObjectId) {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }

    return task;
  }

  @Patch(":id")
  async update(
    @Param("id", ObjectIDPipe) id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);

    if (!updatedTask) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }

    return updatedTask;
  }

  @Delete(":id")
  async remove(@Param("id", ObjectIDPipe) id: ObjectId) {
    const removedTask = await this.tasksService.remove(id);

    if (!removedTask) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }

    return removedTask;
  }
}
