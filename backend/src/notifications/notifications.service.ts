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
import { Prisma } from 'src/generated/client';
import {
  unstructuredNotifications,
  unstructuredNotification,
} from './unstructuredFunction';
import {
  NotificationStructured,
  PackageService,
  SendNotification,
} from './types/notification';


@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushService,
  ) {}
  private sendNotification(
    channel: string,
    { title, content, recipient }: SendNotification,
    user: AuthenticatedUser,
  ): Date | null {
    switch (channel) {
      case 'EMAIL':
        return this.emailService.sendEmail(
          { title: title, content: content, recipient: recipient },
          user,
        );
      case 'SMS':
        return this.smsService.sendSMS(
          { title: title, content: content, recipient: recipient },
          user,
        );
      case 'PUSH':
        return this.pushService.sendPush(
          { title: title, content: content, recipient: recipient },
          user,
        );
      default:
        return null;
    }
  }
  private getRecipient(notification: NotificationStructured) {
    switch (notification.channel) {
      case 'EMAIL':
        return notification.email!.recipient;
      case 'SMS':
        return notification.sms!.recipient;
      case 'PUSH':
        return notification.push!.recipient;
      default:
        throw new BadRequestException(
          'Canal de notificacion invalido al obtener destinatario',
        );
    }
  }
  private getSentAt(notification: NotificationStructured): Date | null {
    switch (notification.channel) {
      case 'EMAIL':
        return notification.email?.sentAt ?? null;

      case 'SMS':
        return notification.sms?.sentAt ?? null;

      case 'PUSH':
        return notification.push?.sentAt ?? null;

      default:
        return null;
    }
  }
  private packageService(
    channel: string,
    recipient: string,
    sentAt: Date | null,
    method: 'create' | 'update',
  ): PackageService {
    switch (channel) {
      case 'EMAIL':
        return {
          email: {
            [method]: {
              recipient: recipient!,
              sentAt,
            },
          },
        };
      case 'SMS':
        return {
          sms: {
            [method]: {
              recipient: recipient!,
              sentAt,
            },
          },
        };
      case 'PUSH':
        return {
          push: {
            [method]: {
              recipient: recipient!,
              sentAt,
            },
          },
        };
      default:
        throw new BadRequestException('Canal de notificacion invalido');
    }
  }
  async createNotification(
    notification: CreateNotificationDto,
    user: AuthenticatedUser,
  ) {
    console.log('3 - CreateNotification');

    if (notification.channel) {
      const sentAt = this.sendNotification(
        notification.channel,
        {
          title: notification.title,
          content: notification.content,
          recipient: notification.recipient,
        },
        user,
      );

      const service = this.packageService(
        notification.channel,
        notification.recipient,
        sentAt,
        'create',
      );

      const data = {
        title: notification.title,
        content: notification.content,
        channel: notification.channel,
        authorId: user.sub,
        ...service,
      };

      const newNotification = await this.prisma.notifications.create({
        data,
        include: {
          email: true,
          sms: true,
          push: true,
        },
      });

      if (!newNotification)
        throw new NotFoundException('No se pudo crear la notificacion');
      else {
        const notificationUnstructured =
          unstructuredNotification(newNotification);
        return notificationUnstructured;
      }
    }
  }

  async findAllNotifications(sub: number) {
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
    const notificationsUnstructured = unstructuredNotifications(notifications);
    return notificationsUnstructured;
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
    if (!notification) return { msg: 'No se encontro la Notificacion.' };
    return unstructuredNotification(notification);
  }

  async updateNotification(
    idNotification: number,
    updateNotificationDto: UpdateNotificationDto,
    user: AuthenticatedUser,
  ) {
    console.log(updateNotificationDto);
    if (updateNotificationDto.channel !== undefined)
      throw new BadRequestException(
        'El canal de una notificación no puede modificarse',
      );
    else if (
      !updateNotificationDto.content &&
      !updateNotificationDto.recipient &&
      !updateNotificationDto.title
    )
      throw new BadRequestException('No viene ninguno de los datos requeridos');
    console.log('Service Update');

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
    if (this.getSentAt(notification)) {
      throw new NotFoundException(
        'Esta notificacion ya fue enviada y no se puede modificar',
      );
    }

    const content = updateNotificationDto.content ?? notification.content;
    const title = updateNotificationDto.title ?? notification.title;
    const recipient =
      updateNotificationDto.recipient ?? this.getRecipient(notification);

    const updateNotification = {
      content: content,
      title: title,
    };

    const sentAt = this.sendNotification(
      notification.channel,
      {
        title: updateNotification.title,
        content: updateNotification.content,
        recipient: recipient,
      },
      user,
    );
    const service = this.packageService(
      notification.channel,
      recipient,
      sentAt,
      'update',
    );

    const data = {
      ...updateNotification,
      ...service,
    };

    const updatedNotification = await this.prisma.notifications.update({
      where: { authorId: user.sub, id: idNotification },
      include: {
        email: true,
        sms: true,
        push: true,
      },
      data,
    });

    if (!updatedNotification)
      throw new NotFoundException('No se pudo actualizar la Notificacion');
    return unstructuredNotification(updatedNotification);
  }

  async retryNotification(idNotification: number, user: AuthenticatedUser) {
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
    if (this.getSentAt(notification)) {
      throw new NotFoundException(
        'Esta notificacion ya fue enviada y no se puede modificar',
      );
    } else {
      const sentAt = this.sendNotification(
        notification.channel,
        {
          title: notification.title,
          content: notification.content,
          recipient: unstructuredNotification(notification).recipient,
        },
        user,
      );
      if (!sentAt)
        return { msg: 'Fallo el envio, vuelva a intentar en unos minutos.' };
      const service = this.packageService(
        notification.channel,
        unstructuredNotification(notification).recipient,
        sentAt,
        'update',
      );
      const data = {
        title: notification.title,
        content: notification.content,
        ...service,
      };
      const retryNotification = await this.prisma.notifications.update({
        where: { authorId: user.sub, id: idNotification },
        include: {
          email: true,
          sms: true,
          push: true,
        },
        data,
      });
      return unstructuredNotification(retryNotification);
    }
  }

  async removeNotification(idNotification: number, sub: number) {
    try {
      const deleteNotification = await this.prisma.notifications.delete({
        where: {
          authorId: sub,
          id: idNotification,
        },
      });
      return deleteNotification;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          console.log('Registro Inexistente - Error');
          throw new NotFoundException('No se encontro la notificacion');
        }
      }
      console.log(error);
      throw error;
    }
  }
}
