import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHello(): any {
    return {head_val : this.appService.getHello()};
  }
  
  @Get('logform')
  @Render('login-form')
  getlogform(): any {
    return {head_val : this.appService.getHello()};
  }
  
  @Get('check')
  @Render('logout')
  getlog(): any {}
  
  @Get('menu')
  @Render('menu')
  getmenu(): any {}
}
