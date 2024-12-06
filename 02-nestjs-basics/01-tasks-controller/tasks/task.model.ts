import { IsDefined, IsIn } from "@nestjs/class-validator";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export class TaskModel {
  @IsDefined()
  title: string;

  @IsDefined()
  description: string;

  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED, TaskStatus.PENDING])
  status: TaskStatus;
}
