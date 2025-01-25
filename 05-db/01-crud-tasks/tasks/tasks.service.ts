import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new CreateTaskDto();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;

    const err = await this.validateTask(task);
    if (err) {
      return err;
    }

    await this.taskRepository.insert(task);
    return task;
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = new UpdateTaskDto();
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.isCompleted = updateTaskDto.isCompleted;

    const err = await this.validateTask(task);
    if (err) {
      return err;
    }

    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }

  private async validateTask(task: UpdateTaskDto) {
    const errors = await validate(task);
    if (errors.length) {
      console.error("Task validation errors:", errors);
      const err = new Error();
      err.name = "Task is not correct";
      err.message = JSON.stringify(Object.values(errors[0].constraints));
      return err;
    }
  }
}
