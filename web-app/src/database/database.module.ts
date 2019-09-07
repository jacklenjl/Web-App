import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import {Module} from '@nestjs/common';
require('dotenv').config()
@Module({
    imports: [
        MongooseModule.forRoot(process.env.mongoURI, { useNewUrlParser: true }),
        MongooseModule.forFeature([
            { name: 'Users', schema: UsersSchema }

        ])],
    exports:[MongooseModule]
})


export class databaseModule{}