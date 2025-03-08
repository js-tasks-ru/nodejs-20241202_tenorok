import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>("google.clientID"),
      clientSecret: configService.get<string>("google.clientSecret"),
      callbackURL: configService.get<string>("google.callbackURL"),
      scope: configService.get<string[]>("google.scope"),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return this.authService.validateUser({
      id: profile.id,
      displayName: profile.displayName,
      avatar: profile.photos[0].value,
    });
  }
}
