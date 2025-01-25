import { IsString, IsBoolean, IsDefined, IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsString()
  title: string;

  @Column()
  @IsDefined()
  @IsString()
  description: string;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
