import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";
import { Task } from "./tasks/entities/task.entity";

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [Task],
      // Не использовать в продакшене!
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
