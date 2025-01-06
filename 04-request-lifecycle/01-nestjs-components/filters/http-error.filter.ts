import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { appendFileSync } from "node:fs";

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus?.() ?? 500;

    const data = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };

    appendFileSync(
      "errors.log",
      `[${data.timestamp}] ${data.statusCode} - ${data.message}\n`,
    );

    response.status(status).json(data);
  }
}
