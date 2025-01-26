import { NestFactory } from "@nestjs/core";
import mongoose from "mongoose";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MongoFilter } from "./mongo/mongo.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongoFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  mongoose.set("debug", true);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
