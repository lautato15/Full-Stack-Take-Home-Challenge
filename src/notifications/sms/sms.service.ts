import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';

@Injectable()
export class SmsService {
  constructor(private readonly notificationService: NotificationsService) {}

  sendSMS(
    createNotificationDto: CreateNotificationDto,
    user: AuthenticatedUser,
  ) {
    if (createNotificationDto.content.length > 160)
      createNotificationDto.content.slice(0, 160);
    const sent = Boolean(Math.floor(Math.random() * 2));
    return this.notificationService.createNotification(
      createNotificationDto,
      user,
      sent,
    );
  }
}
