import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from "class-validator";
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  @IsDefined()
  @IsString()
  @MinLength(3)
  title: string;

  @Prop({ required: true })
  @IsDefined()
  @IsString()
  description: string;

  @Prop({ default: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @Prop()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline?: string;

  @Prop()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  priority?: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
