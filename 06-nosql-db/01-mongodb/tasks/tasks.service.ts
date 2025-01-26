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
    const task = new CreateTaskDto();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;

    const err = await this.validateTask(task);
    if (err) {
      return err;
    }

    const createdTask = new this.TaskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll() {
    return this.TaskModel.find().exec();
  }

  findOne(id: ObjectId) {
    return this.TaskModel.findById(id).exec();
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    const task = new UpdateTaskDto();
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.isCompleted = updateTaskDto.isCompleted;

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
}
