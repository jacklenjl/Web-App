import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Cookies } from '@nestjsplus/cookies';
import { UserData } from './auth/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHello(): any {
    return { head_val: 'cool' };
  }

  @Get('logform')
  @Render('login-form')
  getlogform(): any {
    return { head_val: 'cool' };
  }

  @Get('check')
  @Render('logout')
  getlog(): any {}

  @Get('menu')
  @Render('menu')
  getmenu(): any {}

  @Get('reg')
  @Render('reg-form')
  getReg(): any {}

  @Get('editpro')
  @Render('edit')
  async getEdit(@Cookies() cookies, @UserData() user): Promise<any> {
    console.log('app servie cookie:', cookies);
    console.log('user val:', user);

    return {
      head_val: user,
    };
  }
}
