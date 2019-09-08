import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../database/interfaces/users.interface';
import { rejects } from 'assert';
import { ApiResponse } from '../response';
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.saltRounds);
var randomString = require('random-string');
var waterfall = require('async-waterfall');
@Injectable()
export class AuthService {

    constructor(
        @InjectModel('Users') private readonly userModel: Model<Users>
    ) { }

    async loginUser(dto: any): Promise<any> {
        return await new Promise(async (resolve, reject) => {
            waterfall([
                async (cb) => {
                    console.log("called", dto)
                    let val = await this.userModel.find({ email: dto.mail });
                    console.log('vallll', val)
                    return cb(null,val)
                },

                async (val, cb) => {
                    console.log("val of 2",val.length)
                    if (val.length) {
                        console.log("this is the got value:", val)
                        let chk = await this.passwordCheck(dto.pass, val[0].password);
                        console.log("chkkkk", chk);
                        return chk ? cb(null, val) : cb(null);
                    } else {
                        return cb(null);
                    }
                },
            ], (err, res) => {
                console.log("rrrrr", res)
                // if (err)
                //     reject(err);
                resolve(res);

            });


        })
    }



    async passwordCheck(plainpass, dbpass): Promise<any> {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(plainpass, dbpass, function (err, res) {
                console.log("this is password check", res, err)
                if (err)
                    reject(err);
                resolve(res);
            });
        })

    }

    async registerUser(dto: any): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(dto);
            waterfall([
                async (cb) => {
                    let obj: any = {};
                    obj.firstName = dto.fuser;
                    obj.lastName = dto.luser;
                    obj.phone = dto.phno;
                    if (dto.userID) {
                        console.log("cb1");
                        const updatedCustomer = await this.userModel.findByIdAndUpdate(dto.userID, obj,
                            { useFindAndModify: false }, (err, res) => {
                                if (res)
                            {    console.log("inside check",err,res)
                              return cb(res)}

                        
                        })
                        // console.log(updatedCustomer)
                        
                    }else
                    return cb(null)

                },
                async (cb) => {
                    console.log("called cb2")
                    console.log(dto, saltRounds);
                    let obj = new this.userModel();
                    let val;
                    obj.tokenval = await this.tokenGenerator();
                    obj.email = dto.mail;
                    obj.firstName = dto.fuser;
                    obj.lastName = dto.luser;
                    obj.phone = dto.phno;

                    bcrypt.hash(dto.pass, saltRounds, async function (err, hash) {
                        // Store hash in your password DB.
                        obj.password = hash;
                        console.log(obj);
                        val = await obj.save();
                    });


                    return "Registered Sucessfully";
                }
            ]), (err, res) => {
                // if (err)
                //     rejects(err)
                // else
                console.log("main",res,err);
                    resolve(res)
            }
        })
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
