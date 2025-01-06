import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RolesGuard } from "../guards/roles.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() signInDto: { username: string }) {
    return this.authService.login(signInDto.username);
  }

  @UseGuards(RolesGuard)
  @Get("profile")
  profile(@Request() req): { username: string; role: string } {
    return { username: req.user.username, role: req.user.role };
  }
}
