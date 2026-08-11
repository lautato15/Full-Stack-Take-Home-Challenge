import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';
import { SendNotification } from '../types/notification';

@Injectable()
export class SmsService {
  sendSMS(
    { title, content, recipient }: SendNotification,
    user: AuthenticatedUser,
  ) {
    if (content.length > 160) content = content.slice(0, 160);
    const sent = Boolean(Math.floor(Math.random() * 2));
    return sent ? new Date() : null;
  }
}
