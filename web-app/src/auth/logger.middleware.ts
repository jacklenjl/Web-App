import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";
import {AuthService} from "./auth.service";
@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    constructor(
        private readonly usersService: AuthService
    ){}
    async use(req: Request,res:Response,next:() =>void){
    let payload=req.headers.authorization;
    let head=payload.split(" ");
    let  payloadObj=await this.usersService.findOne(head[1]);
    let resObj=JSON.stringify(payloadObj);
    let validate=JSON.stringify('valid')
    if(resObj===validate){
        next();
    }else
    {res.end("Please Login Again !!");}
    }
}
