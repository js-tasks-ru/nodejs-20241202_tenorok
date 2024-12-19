import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

const notificationsProvider = {
  provide: NotificationsService.name,
  useFactory: () => new NotificationsService("support@javascript.ru"),
};

@Module({
  providers: [notificationsProvider],
  exports: [notificationsProvider],
})
export class NotificationsModule {}
