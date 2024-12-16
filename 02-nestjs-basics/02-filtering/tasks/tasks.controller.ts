import { Controller, Get, Query, ParseIntPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus, SortName } from "./task.model";
import { EnumValidationPipe } from "../pipes/enum.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(
      "status",
      new EnumValidationPipe({ enum: TaskStatus, optional: true }),
    )
    status?: TaskStatus,
    @Query("page", new ParseIntPipe({ optional: true })) page: number = 1,
    @Query("limit", new ParseIntPipe({ optional: true }))
    limit: number = Infinity,
    @Query("sortBy", new EnumValidationPipe({ enum: SortName, optional: true }))
    sortBy?: SortName,
  ) {
    const tasks = this.tasksService.getTasks(page - 1, limit, status);

    if (sortBy) {
      return this.tasksService.sortBy(tasks, sortBy);
    }

    return tasks;
  }
}
