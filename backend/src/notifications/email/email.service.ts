import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

@Injectable()
export class EmailService {
  sendEmail(notificationDto: UpdateNotificationDto, user: AuthenticatedUser) {
    const template = {
      recipient: notificationDto.email,
      sender: user.email,
      subject: notificationDto.title,
      content: notificationDto.content,
    };
    const sent = Boolean(Math.floor(Math.random() * 2));
    return sent ? new Date() : null;
  }
}
