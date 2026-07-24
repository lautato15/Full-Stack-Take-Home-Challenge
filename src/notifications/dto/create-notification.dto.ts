import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title?: string;
  @IsNotEmpty()
  @IsString()
  @Length(5, 150)
  content?: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['EMAIL', 'SMS', 'PUSH'])
  channel?: string;
}
