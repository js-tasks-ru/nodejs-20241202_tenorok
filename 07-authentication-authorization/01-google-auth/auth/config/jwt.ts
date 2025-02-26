import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
  // Ставим заглушку для тестов.
  secret: process.env.JWT_SECRET ?? "killer-is-jim",
  signOptions: { expiresIn: "24h" },
}));
