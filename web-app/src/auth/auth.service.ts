import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../database/interfaces/users.interface';
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = parseInt(process.env.saltRounds);
var randomString = require('random-string');
@Injectable()
export class AuthService {

    constructor(
        @InjectModel('Users') private readonly userModel: Model<Users>
    ) { }

    async loginUser(dto: any):Promise<string> {
        console.log("called",dto)
        let val= await this.userModel.find({ email: dto.mail });
        
        
        // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        //     // res == true
        // });
        return val;
    }

    async registerUser(dto: any) {
        console.log(dto, saltRounds);
        let obj = new this.userModel(dto);

        bcrypt.hash(dto.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            obj.password = hash;
        });

        obj.tokenval = await this.tokenGenerator();
        console.log(obj);
        return await obj.save(dto);
    }


    async tokenGenerator(): Promise<string> {
        var x = randomString({
            length: 20,
            numeric: true,
            letters: true,
            special: false,
            exclude: ['a', '1']
        });
        return x;
    }

    async findOne(dto: any) {
        let val = await this.userModel.findOne({ tokenval: dto });
        console.log("userservice call", dto, val);
        if (val)
            return 'valid';
        return 'invaild';
    }

}
