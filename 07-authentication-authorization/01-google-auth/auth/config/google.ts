import { registerAs } from "@nestjs/config";

export default registerAs("google", () => ({
  // Ставим заглушки для тестов.
  clientID: process.env.GOOGLE_CLIENT_ID ?? "clientID",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "clientSecret",
  callbackURL: "http://localhost:3000/auth/google/callback",
  scope: ["email", "profile"],
}));
