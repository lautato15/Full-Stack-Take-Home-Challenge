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
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  AuthenticatedUser,
  CurrentUser,
} from 'src/auth/decorators/current-user.decorator';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { PushService } from './push/push.service';

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
    switch (createNotificationDto.channel) {
      case 'EMAIL':
        if (createNotificationDto.email)
          return this.emailService.sendEmail(createNotificationDto, user);
        throw new BadRequestException('No hay un email asignado');
      case 'SMS':
        if (createNotificationDto.phone)
          return this.smsService.sendSMS(createNotificationDto, user);
        throw new BadRequestException('No hay un numero telefónico asignado');
      case 'PUSH':
        if (createNotificationDto.token)
          return this.smsService.sendSMS(createNotificationDto, user);
        throw new BadRequestException('No hay un numero telefónico asignado');
        break;
      default:
        throw new BadRequestException('Tipo de canal de envío desconocido');
    }
    // return this.notificationsService.createNotification(
    //   createNotificationDto,
    //   user,
    // );
  }

  @Get()
  findAllNotifications(@CurrentUser() sub: number) {
    return this.notificationsService.findAllNotifications(sub);
  }

  @Get(':id')
  findOneNotification(@Param('id') id: string, @CurrentUser() sub: number) {
    return this.notificationsService.findOneNotification(+id, sub);
  }

  @Patch(':id')
  updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @CurrentUser() sub: number,
  ) {
    return this.notificationsService.updateNotification(
      +id,
      updateNotificationDto,
      sub,
    );
  }

  @Delete(':id')
  removeNotification(@Param('id') id: string, @CurrentUser() sub: number) {
    return this.notificationsService.removeNotification(+id, sub);
  }
}
