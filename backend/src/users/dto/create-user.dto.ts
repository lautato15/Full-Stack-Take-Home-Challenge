import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  password?: string;
}
