import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('login-form')
  getHello(): any {
    return {head_val : this.appService.getHello()};
  }
  
  @Get('check')
  @Render('logout')
  getlog(): any {
    return 'redo';
  }
}
