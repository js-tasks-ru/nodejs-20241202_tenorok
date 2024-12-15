import { Controller, Get, Query, ParseIntPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus, GroupName } from "./task.model";
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
  ) {
    return this.tasksService.getTasks(page - 1, limit, status);
  }
}
