import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import validator from 'validator';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('2 - LocalStrategy');
    if (!validator.isEmail(email)) {
      throw new BadRequestException('Email invalido');
    }
      const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Fallo la validacion');
    }
    return user;
  }
}
