import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(task: Task): Task {
    const newTask: Task = {
      id: String(this.tasks.length),
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, update: Task): Task {
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
    this.tasks.splice(index, 1);
    return task;
  }
}
