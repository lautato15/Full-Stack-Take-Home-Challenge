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

  @IsOptional()
  @IsString()
  recipient!: string;
}
