import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";
import {AuthService} from "./auth.service";
@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    constructor(
        private readonly authService: AuthService
    ){}
use(req: Request,res:Response,next:() =>void){
    //console.log("called middleware"+req.url);
    let payload=req.headers.authorization;
    //console.log(payload);
    let ff=payload.split(" ");
    payload=this.authService.findOne(ff[1]);
    //console.log("2222",payload)
    if(payload==='valid')
    {
        //console.log("cool");
    next();}
    else
    {
        res.end("error");
    }
}
}
