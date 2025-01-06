import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string): Promise<{ access_token: string }> {
    if (username !== "admin") {
      throw new UnauthorizedException();
    }

    const payload = { username, role: "admin" };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
