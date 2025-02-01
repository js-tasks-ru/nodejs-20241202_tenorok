import { Injectable } from "@nestjs/common";
import { validate } from "class-validator";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.createTask(CreateTaskDto, createTaskDto);

    const err = await this.validateTask(task);
    if (err) {
      return err;
    }

    const createdTask = new this.TaskModel(task);
    return createdTask.save();
  }

  async findAll() {
    return this.TaskModel.find().exec();
  }

  findOne(id: ObjectId) {
    return this.TaskModel.findById(id).exec();
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    const task = this.createTask(UpdateTaskDto, updateTaskDto);

    const err = await this.validateTask(task);
    if (err) {
      return err;
    }

    return this.TaskModel.findByIdAndUpdate(id, task, {
      new: true,
    }).exec();
  }

  async remove(id: ObjectId) {
    return this.TaskModel.findByIdAndDelete(id).exec();
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

  private createTask(
    TaskClass: typeof UpdateTaskDto,
    entryTask: UpdateTaskDto,
  ): UpdateTaskDto {
    const task = new TaskClass();
    task.title = entryTask.title;
    task.description = entryTask.description;
    task.isCompleted = entryTask.isCompleted;
    task.deadline = entryTask.deadline;
    task.priority = entryTask.priority;
    return task;
  }
}
