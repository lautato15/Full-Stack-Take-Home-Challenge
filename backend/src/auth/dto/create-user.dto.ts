import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'Correo asociado a la cuenta',
  })
  @IsNotEmpty({ message: 'Debe exisistir un email' })
  @IsEmail({}, { message: 'Debe ser un email valido' })
  email?: string;

  @ApiProperty({
    example: '1234',
    description: 'Contraseña para el usuario',
  })
  @IsNotEmpty({ message: 'Debe exisistir una contraseña' })
  @IsString({ message: 'La contraseña debe ser un String' })
  @Length(4, 10, {
    message: 'La contraseña debe tener entre 4 y 10 caracteres',
  })
  password?: string;
}
