import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

@Injectable()
export class PushService {
  sendPush(notificationDto: UpdateNotificationDto, user: AuthenticatedUser) {
    const payload = {
      title: notificationDto.title,
      msg: notificationDto.content,
      token: notificationDto.token,
    };
    const sent = Boolean(Math.floor(Math.random() * 2));
    return sent ? new Date() : null;
  }
}
