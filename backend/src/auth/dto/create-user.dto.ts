import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Debe exisistir un email' })
  @IsEmail({}, { message: 'Debe ser un email valido' })
  email?: string;
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un String' })
  name?: string;
  @IsNotEmpty({ message: 'Debe exisistir una contraseña' })
  @IsString({ message: 'La contraseña debe ser un String' })
  @Length(4, 10, {
    message: 'La contraseña debe tener entre 4 y 10 caracteres',
  })
  password?: string;
}
