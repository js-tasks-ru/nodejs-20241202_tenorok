import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "../constants";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const role = request.headers["x-role"];
    const token = this.extractTokenFromHeader(request);

    if (!token && role !== "admin") {
      throw new ForbiddenException("Доступ запрещён: требуется роль admin");
    }

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        if (payload.role !== "admin") {
          throw new ForbiddenException("Доступ запрещён: требуется роль admin");
        }
        request["user"] = payload;
      } catch (err) {
        throw new UnauthorizedException(err.message);
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
