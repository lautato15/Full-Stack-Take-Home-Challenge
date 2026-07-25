import {
  IsEmail,
  IsIn,
  isMobilePhone,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title!: string;
  @IsNotEmpty()
  @IsString()
  @Length(5, 150)
  content!: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['EMAIL', 'SMS', 'PUSH'])
  channel!: string;

  @IsEmail()
  email?: string;

  @IsMobilePhone()
  phone?: string;

  @IsString()
  @MinLength(10)
  token?: string;
}
