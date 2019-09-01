import { Injectable, NestMiddleware, Render } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private readonly usersService: AuthService
    ) { }



    async use(req: Request, res: Response, next: () => void) {
        
        var cook = req.cookies;
        console.log(cook.Authorization);
       
        if (cook) {
            let payload = cook.Authorization;
            let head;
            if (payload) {
                head = payload.split(" ");
                let payloadObj = await this.usersService.findOne(head[1]);
                let resObj = JSON.stringify(payloadObj);
                let validate = JSON.stringify('valid')
                if (resObj === validate) {
                    next();
                } else { res.end("Please Login Again !!"); }
            }
            else {
                res.render('error.hbs')
                //res.end("Please Login Again !!");
            }
        }
        else {
            res.render('error.hbs');
        }
    }
    

}
