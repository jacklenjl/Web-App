import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Users} from '../database/interfaces/users.interface';
@Injectable()
export class AuthService {

    constructor(
        @InjectModel('Users') private readonly userModel:Model<Users>
    ){}
    async registerUser(dto: any)
    {
        console.log(dto);
        let obj:any={};
        obj=new this.userModel(dto);
        obj.tokenval='123';
        console.log(obj);
        return await obj.save(dto);
    }


    async findOne(dto :any){
        let val=await this.userModel.findOne({tokenval:dto});
        console.log("userservice call",dto,val);
        if(val)
        return 'valid';
        return 'invaild';
    }

}
