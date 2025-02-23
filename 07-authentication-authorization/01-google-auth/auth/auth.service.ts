import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

export interface JwtPayload {
  sub: string;
  displayName: string;
  avatar: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: User): Promise<User> {
    const { id, displayName, avatar } = data;
    const user = await this.usersService.findOne(id);

    if (!user) {
      return this.usersService.create({
        id,
        displayName,
        avatar,
      });
    }

    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      displayName: user.displayName,
      avatar: user.avatar,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
