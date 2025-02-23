import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // Ставим заглушки для тестов.
      clientID: process.env.GOOGLE_CLIENT_ID ?? "clientID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "clientSecret",
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["email", "profile"],
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
