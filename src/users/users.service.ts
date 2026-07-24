import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(createUserDto: CreateUserDto) {
    if (createUserDto.email && createUserDto.password) {
      const user = await this.prisma.users.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: createUserDto.password,
        },
      });
      if (user) return user;
      throw new NotFoundException('No se pudo Registrar el usuario');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    console.log('Aca??');
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
