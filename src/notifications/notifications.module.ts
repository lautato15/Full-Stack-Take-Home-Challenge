import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { PushService } from './push/push.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    PrismaService,
    EmailService,
    SmsService,
    PushService,
  ],
})
export class NotificationsModule {}
