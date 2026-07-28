import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';
import { EmailService } from './email/email.service';
import { SmsService } from './sms/sms.service';
import { PushService } from './push/push.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushService,
  ) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
    user: AuthenticatedUser,
    sentAt: Date | null,
  ) {
    console.log('3 - CreateNotification');

    const notification = await this.prisma.notifications.create({
      data: {
        title: createNotificationDto.title,
        content: createNotificationDto.content,
        channel: createNotificationDto.channel,
        authorId: user.sub,
      },
    });

    let notificationChannel;
    switch (createNotificationDto.channel) {
      case 'EMAIL':
        notificationChannel = this.prisma.email.create({
          data: {
            notificationId: notification.id,
            recipient: createNotificationDto.email!,
            sentAt: sentAt,
          },
        });
        break;
      case 'SMS':
        notificationChannel = this.prisma.sms.create({
          data: {
            notificationId: notification.id,
            recipient: Number(createNotificationDto.phone)!,
            sentAt: sentAt,
          },
        });
        break;
      case 'PUSH':
        notificationChannel = this.prisma.push.create({
          data: {
            notificationId: notification.id,
            recipient: createNotificationDto.token!,
            sentAt: sentAt,
          },
        });
        break;
      default:
        throw new NotFoundException(
          'Error interno en los servicios de Notificaciones',
        );
    }
    notificationChannel = await notificationChannel;
    if (notification && notificationChannel)
      return {
        msg: 'Notificacion creada con exito',
        notification: notification,
        channel: notificationChannel,
      };
    throw new NotFoundException('No se pudo crear la notificacion');
  }

  async findAllNotifications(sub: number) {
    console.log('sub');
    console.log(sub);
    const notifications = await this.prisma.notifications.findMany({
      include: {
        email: true,
        sms: true,
        push: true,
      },
      where: {
        authorId: sub,
      },
    });
    if (!notifications)
      throw new BadRequestException('No existen notificaciones.');
    return { msg: 'Sus notificaciones:', notifications: notifications };
  }

  async findOneNotification(idNotification: number, sub: number) {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        authorId: sub,
        id: idNotification,
      },
      include: {
        email: true,
        sms: true,
        push: true,
      },
    });
    if (!notification) return { msg: 'No se encuentra dicha notificacion' };
    return notification;
  }

  async updateNotification(
    idNotification: number,
    updateNotificationDto: UpdateNotificationDto,
    user: AuthenticatedUser,
  ) {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        authorId: user.sub,
        id: idNotification,
      },
      include: {
        email: true,
        sms: true,
        push: true,
      },
    });
    if (!notification)
      throw new NotFoundException('No se encontro la notificacion');
    else if (
      notification.email?.sentAt ||
      notification.sms?.sentAt ||
      notification.push?.sentAt
    ) {
      throw new NotFoundException(
        'Esta notificacion ya fue enviada y no se puede modificar',
      );
    }

    let sentAt: Date | null = null;

    switch (notification.channel) {
      case 'EMAIL':
        sentAt = this.emailService.sendEmail(updateNotificationDto, user);
        break;
      case 'SMS':
        if (
          updateNotificationDto.channel === 'SMS' &&
          updateNotificationDto.content.length > 160
        )
          updateNotificationDto.content.slice(0, 160);
        sentAt = this.smsService.sendSMS(updateNotificationDto, user);
        break;
      case 'PUSH':
        sentAt = this.smsService.sendSMS(updateNotificationDto, user);
        break;
    }
    console.log('Sending');
    console.log(sentAt);

    const services = {
      email: {
        update: {
          recipient: updateNotificationDto.email,
          sentAt: sentAt,
        },
      },
      sms: {
        update: {
          recipient: updateNotificationDto.phone,
          sentAt: sentAt,
        },
      },
      push: {
        update: {
          recipient: updateNotificationDto.token,
          sentAt: sentAt,
        },
      },
    };
    const serviceUpdate = services[notification.channel.toLowerCase()];
    console.log('serviceUpdate,');
    console.log(serviceUpdate);
    const updateNotification = await this.prisma.notifications.update({
      where: { authorId: user.sub, id: idNotification },
      include: {
        email: true,
        sms: true,
        push: true,
      },
      data: {
        title: updateNotificationDto.title,
        content: updateNotificationDto.content,
        channel: updateNotificationDto.channel,
        [notification.channel.toLowerCase()]: serviceUpdate,
      },
    });
    if (!updateNotification)
      throw new NotFoundException('No se pudo actualizar la Notificacion');
    return updateNotification;
  }

  async removeNotification(idNotification: number, sub: number) {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        authorId: sub,
        id: idNotification,
      },
    });
    if (!notification)
      throw new NotFoundException('No se encontro la notificacion');
    const deleteNotification = await this.prisma.notifications.delete({
      where: {
        authorId: sub,
        id: idNotification,
      },
    });
    console.log(deleteNotification);
    if (deleteNotification) return 'Notificacion eliminada';
    throw new NotFoundException('No se pudo eliminar la notificacion');
  }
}
