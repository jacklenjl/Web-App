import { Injectable } from '@nestjs/common';
import { Users } from './database/interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
var waterfall = require('async-waterfall');
@Injectable()
export class AppService {
  constructor(@InjectModel('Users') private readonly userModel: Model<Users>) {}
  async findFormData(dto: any) {
    return await new Promise(async (resolve, reject) => {
      waterfall(
        [
          async cb => {
            let chk = dto.Authorization.split(' ');
            let val = await this.userModel.findOne({ tokenval: chk[1] });
            console.log('userservice call', dto, val);
            return cb(null, val);
          },
        ],
        (err, res) => {
          console.log('rrrrr', res);
          if (err) reject(err);
          resolve(res);
        },
      );
    });
  }
}
