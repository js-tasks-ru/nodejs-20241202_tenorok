import { Injectable } from "@nestjs/common";
import { Task, TaskStatus, SortName } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getTasks(page: number, limit: number, status?: TaskStatus): Task[] {
    const tasks = this.getFilteredTasks(status);
    const from = Number.isFinite(limit) ? page * limit : 0;
    return tasks.slice(from, from + limit);
  }

  sortBy(tasks: Task[], sortName: SortName): Task[] {
    return tasks.sort((a, b) => (a[sortName] > b[sortName] ? 1 : -1));
  }

  private getFilteredTasks(status?: TaskStatus): Task[] {
    if (!status) {
      return this.tasks;
    }

    return this.tasks.filter((task) => task.status === status);
  }
}
