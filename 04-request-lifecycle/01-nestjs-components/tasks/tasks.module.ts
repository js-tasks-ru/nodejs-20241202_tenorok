import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { LoggingMiddleware } from "../middlewares/logging.middleware";
import { jwtConstants } from "../constants";
import { TasksController } from "./tasks.controller";
import { AuthController } from "./auth.controller";
import { TasksService } from "./tasks.service";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [TasksController, AuthController],
  providers: [TasksService, AuthService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("tasks");
  }
}
