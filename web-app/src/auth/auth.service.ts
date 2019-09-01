import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../database/interfaces/users.interface';
import { checkServerIdentity } from 'tls';
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = parseInt(process.env.saltRounds);
var randomString = require('random-string');
@Injectable()
export class AuthService {

    constructor(
        @InjectModel('Users') private readonly userModel: Model<Users>
    ) { }

    async loginUser(dto: any): Promise<string> {
        console.log("called", dto)
        let val = await this.userModel.find({ email: dto.mail });
        console.log('vallll', val)
        if (val.length) {
            //console.log(val[0].password);
            //let chk=await this.passwordCheck(dto.pass,val[0].password);
            let chk = await new Promise((resolve, reject) => {
                bcrypt.compare(dto.pass, val[0].password, function (err, hash) {
                    if (err) reject(err)
                    resolve(hash)
                });
            })
            return chk ? val : null;
        } else {
            return null;
        }


    }

    async passwordCheck(plainpass, dbpass): Promise<any> {
        new Promise(function (resolve, reject) {
            bcrypt.compare(plainpass, dbpass, function (err, res) {
                if (err)
                    reject(err);
                resolve(res);
            });
        })

    }

    async registerUser(dto: any): Promise<any> {
        console.log(dto, saltRounds);
        let obj = new this.userModel(dto);
        let val;
        obj.tokenval = await this.tokenGenerator();
        bcrypt.hash(dto.password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            obj.password = hash;
            console.log(obj);
            val = await obj.save(dto);
        });


        return "Registered Sucessfully";
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
