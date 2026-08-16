import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { SendNotification } from '../types/notification';

@Injectable()
export class PushService {
  sendPush(
    { title, content, recipient }: SendNotification,
    user: AuthenticatedUser,
  ) {
    const payload = {
      title: title,
      msg: content,
      recipient: recipient,
    };
    const sent = Boolean(Math.floor(Math.random() * 2));
    return sent ? new Date() : null;
  }
}
