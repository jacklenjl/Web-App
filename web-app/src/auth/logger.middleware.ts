import { Injectable, NestMiddleware, Render } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    var cook = req.cookies;
    console.log(cook.Authorization);

    if (cook) {
      let payload = cook.Authorization;
      let head;
      if (payload) {
        head = payload.split(' ');
        let payloadObj = this.jwtService.verify(head[1]);
        payloadObj = await this.usersService.findOne(payloadObj.sub);
        console.log('oBJ is :', payloadObj.checkUser);
        let resObj = JSON.stringify(payloadObj.checkUser);
        let validate = JSON.stringify('valid');
        if (resObj === validate) {
          req.user = payloadObj;
          next();
        } else {
          res.end('Please Login Again !!');
        }
      } else {
        res.render('error.hbs');
        //res.end("Please Login Again !!");
      }
    } else {
      res.render('error.hbs');
    }
  }
}
