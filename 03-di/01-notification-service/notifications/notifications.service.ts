import { Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  sendEmail(to: string, subject: string, message: string): void {
    if (!subject) {
      throw new BadRequestException("Отсутствует тема для email");
    }

    if (!message) {
      throw new BadRequestException("Отсутствует текст для email");
    }

    console.log(`Email sent to ${to}: [${subject}] ${message}`);
  }

  sendSMS(to: string, message: string): void {
    if (!message) {
      throw new BadRequestException("Отсутствует текст для SMS");
    }

    console.log(`SMS sent to ${to}: ${message}`);
  }
}
