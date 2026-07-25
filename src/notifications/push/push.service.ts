import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';

@Injectable()
export class PushService {
  constructor(private readonly notificationService: NotificationsService) {}

  sendPush(
    createNotificationDto: CreateNotificationDto,
    user: AuthenticatedUser,
  ) {
    const payload = {
      title: createNotificationDto.title,
      msg: createNotificationDto.content,
      token: createNotificationDto.token,
    };
    const sent = Boolean(Math.floor(Math.random() * 2));
    return this.notificationService.createNotification(
      createNotificationDto,
      user,
      sent,
    );
  }
}
