import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  AuthenticatedUser,
  AuthenticatedUserId,
  CurrentUser,
} from 'src/auth/decorators/current-user.decorator';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { PushService } from './push/push.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushService,
  ) {}

  @Post()
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    let sentAt: Date | null = null;
    if (
      createNotificationDto.channel === 'SMS' &&
      createNotificationDto.content.length > 160
    )
      createNotificationDto.content.slice(0, 160);

    switch (createNotificationDto.channel) {
      case 'EMAIL':
        if (createNotificationDto.email)
          sentAt = this.emailService.sendEmail(createNotificationDto, user);
        else throw new BadRequestException('No hay un email asignado');
        break;
      case 'SMS':
        if (createNotificationDto.phone)
          sentAt = this.emailService.sendEmail(createNotificationDto, user);
        else
          throw new BadRequestException('No hay un numero telefónico asignado');
        break;
      case 'PUSH':
        if (createNotificationDto.token)
          sentAt = this.smsService.sendSMS(createNotificationDto, user);
        else throw new BadRequestException('No hay un token asignado');
        break;
      default:
        if (
          createNotificationDto.email ||
          createNotificationDto.phone ||
          createNotificationDto.token
        )
          throw new BadRequestException('Tipo de canal de envío desconocido');
    }
    return this.notificationsService.createNotification(
      createNotificationDto,
      user,
      sentAt,
    );
  }

  @Get()
  findAllNotifications(@CurrentUser() { sub }: AuthenticatedUserId) {
    return this.notificationsService.findAllNotifications(sub);
  }

  @Get(':id')
  findOneNotification(
    @Param('id') id: string,
    @CurrentUser() { sub }: AuthenticatedUserId,
  ) {
    return this.notificationsService.findOneNotification(+id, sub);
  }

  @Patch(':id')
  updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.notificationsService.updateNotification(
      +id,
      updateNotificationDto,
      user,
    );
  }

  @Delete(':id')
  removeNotification(
    @Param('id') id: string,
    @CurrentUser() { sub }: AuthenticatedUserId,
  ) {
    return this.notificationsService.removeNotification(+id, sub);
  }
}
