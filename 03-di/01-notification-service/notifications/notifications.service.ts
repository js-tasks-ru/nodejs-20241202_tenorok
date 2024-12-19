import { Injectable, Logger, BadRequestException } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  sendEmail(to: string, subject: string, message: string): void {
    if (!subject) {
      throw new BadRequestException("Отсутствует тема для email");
    }

    if (!message) {
      throw new BadRequestException("Отсутствует текст для email");
    }

    this.logger.log(`Email sent to ${to}: [${subject}] ${message}`);
  }

  sendSMS(to: string, message: string): void {
    if (!message) {
      throw new BadRequestException("Отсутствует текст для SMS");
    }

    this.logger.log(`SMS sent to ${to}: ${message}`);
  }
}
