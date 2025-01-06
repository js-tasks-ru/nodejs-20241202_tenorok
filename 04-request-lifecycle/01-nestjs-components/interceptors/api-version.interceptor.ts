import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const preTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const postTime = Date.now();

        return {
          ...data,
          apiVersion: "1.0",
          executionTime: `${postTime - preTime}ms`,
        };
      }),
    );
  }
}
