import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseFilters,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { TypeOrmFilter } from "../filters/typeorm-error.filter";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@UseFilters(new TypeOrmFilter())
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() task: CreateTaskDto) {
    const createdTask = await this.tasksService.create(task);

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
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }

    return task;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ) {
    const updatedTask = await this.tasksService.update(id, task);

    if (!updatedTask) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }

    return updatedTask;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    const result = await this.tasksService.remove(id);

    if (result.affected === 0) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }

    return {
      message: "Task deleted successfully",
    };
  }
}
