import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsDefined, IsOptional, IsString } from "class-validator";
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  @IsDefined()
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsDefined()
  @IsString()
  description: string;

  @Prop({ default: false })
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
