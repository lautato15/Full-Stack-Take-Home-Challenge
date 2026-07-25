import {
  IsEmail,
  IsIn,
  isMobilePhone,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Min,
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

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumberString()
  @IsMobilePhone()
  @Min(8)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(15)
  token?: string;
}
