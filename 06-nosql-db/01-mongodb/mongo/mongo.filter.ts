import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

type ExceptionType = mongoose.Error.ValidationError | mongoose.mongo.MongoError;

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: ExceptionType, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      error: "Bad Request",
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
