import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data) {
    console.log(data);
    return this.authService.login(data.username, data.password);
  }

  @Post('register')
  register(@Body() data) {
    console.log(data);
    return this.authService.register(
      data.username,
      data.phone,
      data.email,
      data.password,
    );
  }

  // @Get('me')
  // getMe(@Request() {user}){
  //   return this.authService.getMe(user.id)
  // }
}
