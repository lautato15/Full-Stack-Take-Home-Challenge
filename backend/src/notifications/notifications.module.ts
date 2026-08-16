import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { PushService } from './push/push.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, EmailService, SmsService, PushService],
})
export class NotificationsModule {}
