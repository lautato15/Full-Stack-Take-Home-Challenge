import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({
    example: 'Mail de Bienvenida',
    description: 'Titulo de la notificacion',
  })
  @IsOptional()
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'Bienvenido a nuestro nuevo canal sobre programacion...',
    description: 'Contenido de la notificacion',
  })
  @IsOptional()
  @IsString()
  content!: string;

  @ApiProperty({
    example: ['EMAIL', 'SMS', 'PUSH'],
    description:
      'Canal por el cual se enviara la notificacion, solo se admiten los valores: "EMAIL", "SMS", "PUSH"',
  })
  @IsOptional()
  @IsString()
  @IsIn(['EMAIL', 'SMS', 'PUSH'])
  channel!: string;
}
