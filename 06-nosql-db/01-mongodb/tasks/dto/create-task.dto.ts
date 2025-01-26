import { IsString } from "class-validator";
import { Task } from "../schemas/task.schema";

export class CreateTaskDto extends Task {}
