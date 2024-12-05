import { Injectable, NotFoundException } from "@nestjs/common";
import { validate } from "@nestjs/class-validator";
import { Task, TaskModel } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  async createTask(task: Task): Promise<Task> {
    if (!(await this.validateTask(task))) {
      return null;
    }

    const newTask: Task = {
      id: String(this.tasks.length),
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, update: Task): Promise<Task> {
    if (!(await this.validateTask(update))) {
      return null;
    }

    const index = this.tasks.findIndex((task) => task.id === id);

    if (index >= 0) {
      this.tasks[index] = {
        id: this.tasks[index].id,
        ...update,
      };
    }

    return this.tasks[index];
  }

  deleteTask(id: string): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    const task = this.tasks[index];

    if (task) {
      this.tasks.splice(index, 1);
    }

    return task;
  }

  private async validateTask(task: Task): Promise<boolean> {
    const taskModel = new TaskModel();
    taskModel.title = task.title;
    taskModel.description = task.description;
    taskModel.status = task.status;

    const errors = await validate(taskModel);
    if (errors.length) {
      console.error("Task validation errors:", errors);
      return false;
    }

    return true;
  }
}
