import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { SendNotification } from '../types/notification';

@Injectable()
export class EmailService {
  sendEmail(
    { title, content, recipient }: SendNotification,
    user: AuthenticatedUser,
  ) {
    const template = {
      recipient: recipient,
      sender: user.email,
      subject: title,
      content: content,
    };
    // const sent = Boolean(Math.floor(Math.random() * 2));
    const sent = false;
    return sent ? new Date() : null;
  }
}
