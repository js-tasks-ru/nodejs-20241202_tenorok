import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { TypeORMError } from "typeorm";

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(error: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    console.error("TypeOrmFilter error", error);

    const data = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.message,
      timestamp: new Date().toISOString(),
    };

    response.status(data.status).json(data);
  }
}
