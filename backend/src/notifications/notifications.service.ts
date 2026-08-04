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
    let data: Prisma.NotificationsUncheckedCreateInput = {
      title: createNotificationDto.title,
      content: createNotificationDto.content,
      channel: createNotificationDto.channel,
      authorId: user.sub,
    };
    switch (createNotificationDto.channel) {
      case 'EMAIL':
        data.email = {
          create: {
            recipient: createNotificationDto.email!,
            sentAt,
          },
        };
        break;
      case 'SMS':
        data.sms = {
          create: {
            recipient: createNotificationDto.phone!,
            sentAt,
          },
        };
        break;
      case 'PUSH':
        data.push = {
          create: {
            recipient: createNotificationDto.token!,
            sentAt,
          },
        };
    }
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
        sentAt = this.pushService.sendPush(updateNotificationDto, user);
        break;
    }
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
    return unstructuredNotification(updateNotification);
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
