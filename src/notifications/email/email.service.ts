import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationsService } from '../notifications.service';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';

@Injectable()
export class EmailService {
  constructor(private readonly notificationService: NotificationsService) {}

  sendEmail(
    createNotificationDto: CreateNotificationDto,
    user: AuthenticatedUser,
  ) {
    const template = {
      recipient: createNotificationDto.email,
      sender: user.email,
      subject: createNotificationDto.title,
      content: createNotificationDto.content,
    };
    const sent = Boolean(Math.floor(Math.random() * 2));
    return this.notificationService.createNotification(
      createNotificationDto,
      user,
      sent,
    );
  }
}
