import * as mongoose from 'mongoose';
export const UsersSchema = new mongoose.Schema({

    email:String,
    password:String,
    firstName:String,
    lastName:String,
    tokenval:String,
    phone:String

})