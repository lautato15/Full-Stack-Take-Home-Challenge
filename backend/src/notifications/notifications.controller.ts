import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Response,
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crea una notificacion' })
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    console.log('Controller de Create');
    return this.notificationsService.createNotification(
      createNotificationDto,
      user,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Busca todas las notificaciones del usuario' })
  findAllNotifications(@CurrentUser() { sub }: AuthenticatedUserId) {
    return this.notificationsService.findAllNotifications(sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca una notificacion por ID del usuario' })
  findOneNotification(
    @Param('id') id: string,
    @CurrentUser() { sub }: AuthenticatedUserId,
  ) {
    return this.notificationsService.findOneNotification(+id, sub);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza una notificacion si esta pendiente de envio',
  })
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

  @Post(':id/retry')
  @ApiOperation({
    summary:
      'Intenta volver a enviar una notificacion en estado pendiente, sin modificar campos de la misma',
  })
  retrySend(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.notificationsService.retryNotification(+id, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una notificacion si es que no se ah enviado',
  })
  removeNotification(
    @Param('id') id: string,
    @CurrentUser() { sub }: AuthenticatedUserId,
  ) {
    return this.notificationsService.removeNotification(+id, sub);
  }
}
