import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma.service';
import { AuthenticatedUser } from 'src/auth/decorators/current-user.decorator';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
    user: AuthenticatedUser,
    sent: boolean,
  ) {
    console.log('3 - CreateNotification');
    const state = sent ? 'enviado' : 'pendiente';
    console.log(state);
    const sentAt = sent ? new Date() : null;
    const notification = await this.prisma.notifications.create({
      data: {
        title: createNotificationDto.title,
        content: createNotificationDto.content,
        channel: createNotificationDto.channel,
        authorId: user.sub,
      },
    });
    const channels = {
      EMAIL: this.prisma.email.create({
        data: {
          notificationId: notification.id,
          recipient: createNotificationDto.email!,
          state: state,
          sentAt: sentAt,
        },
      }),
      SMS: this.prisma.sms.create({
        data: {
          notificationId: notification.id,
          recipient: Number(createNotificationDto.phone)!,
          state: state,
          sentAt: sentAt,
        },
      }),
      PUSH: this.prisma.push.create({
        data: {
          notificationId: notification.id,
          recipient: createNotificationDto.token!,
          state: state,
          sentAt: sentAt,
        },
      }),
    };
    const channel = channels[createNotificationDto.channel];

    if (notification && channel)
      return {
        msg: 'Notificacion creada con exito',
        notification: notification,
        channel: channel,
      };
    throw new NotFoundException('No se pudo crear la notificacion');
  }

  async findAllNotifications(sub: number) {
    const notifications = await this.prisma.notifications.findMany({
      where: { authorId: sub },
    });
    if (notifications.length < 1) return { msg: 'No tiene notificaciones' };
    return { msg: 'Sus Notificaciones son:', notifications: notifications };
  }

  async findOneNotification(idNotification: number, sub: number) {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        authorId: sub,
        id: idNotification,
      },
    });
    if (!notification) return { msg: 'No se encuentra dicha notificacion' };
    return notification;
  }

  async updateNotification(
    idNotification: number,
    updateNotificationDto: UpdateNotificationDto,
    sub,
  ) {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        authorId: sub,
        id: idNotification,
      },
    });
    if (!notification)
      throw new NotFoundException('No se encontro la notificacion');

    const updateNotification = await this.prisma.notifications.update({
      where: { authorId: sub, id: idNotification },
      data: {
        title: updateNotificationDto.title,
        content: updateNotificationDto.content,
        channel: updateNotificationDto.channel,
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
