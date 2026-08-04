import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

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
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 12345678,
    description: 'Destinatario del SMS',
  })
  @IsOptional()
  @IsString()
  @IsMobilePhone()
  @MinLength(8)
  phone?: string;

  @ApiProperty({
    example: '4jK9sW2mX8pQ5vL3nB7z',
    description: 'Token del dispositivo destinatario',
  })
  @IsOptional()
  @IsString()
  @MinLength(15)
  token?: string;
}
