import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-routes.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: 'Permite loguearse a un usuario registrado',
  })
  @UseGuards(LocalAuthGuard)
  @Post('/auth')
  async login(@Request() req) {
    console.log('4 - AuthController');
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/register')
  @ApiOperation({
    summary: 'Registra un nuevo usuario',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
}
