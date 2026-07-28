import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-routes.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    console.log('4 - AuthController');
    return this.authService.login(req.user);
  }
}
