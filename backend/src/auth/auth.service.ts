import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('3 - AuthServiceValidateUser');
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async login(user: { email: string; id: number }) {
    console.log('5 - AuthServiceLogin');
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.email && createUserDto.password) {
        const user = await this.prisma.users.create({
          data: {
            email: createUserDto.email,
            password: createUserDto.password,
          },
        });
        if (user) {
          const token = this.login(user);
          return token;
        }
      }
    } catch (error) {
      const err = error as { code?: string };
      if (err.code === 'P2002')
        throw new ConflictException('El email ya está registrado');
      else throw new ConflictException(err.code);
    }
  }
}
