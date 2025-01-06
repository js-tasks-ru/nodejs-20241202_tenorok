import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggingMiddleware } from "../middlewares/logging.middleware";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("tasks");
  }
}
