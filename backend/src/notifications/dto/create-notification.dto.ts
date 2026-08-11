import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: 'Mail de Bienvenida',
    description: 'Titulo de la notificacion',
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'Bienvenido a nuestro nuevo canal sobre programacion...',
    description: 'Contenido de la notificacion',
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 150)
  content!: string;

  @ApiProperty({
    enum: ['EMAIL', 'SMS', 'PUSH'],
    description:
      'Canal por el cual se enviara la notificacion, solo se admiten los valores: "EMAIL", "SMS", "PUSH"',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['EMAIL', 'SMS', 'PUSH'])
  channel!: string;

  @ApiProperty({
    example: 'example@mail.com',
    description: 'Destinatario del correo',
  })
  @IsNotEmpty()
  @IsEmail()
  recipient!: string;
}
  