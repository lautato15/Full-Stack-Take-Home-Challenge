import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

@Injectable()
export class SmsService {
  sendSMS(
    updateNotificationDto: UpdateNotificationDto,
    user: AuthenticatedUser,
  ) {
    const sent = Boolean(Math.floor(Math.random() * 2));
    return sent ? new Date() : null;
  }
}
