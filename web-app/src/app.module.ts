import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import {MongooseModule} from '@nestjs/mongoose';

require('dotenv').config()

@Module({
  imports: [AuthModule,MongooseModule.forRoot(process.env.mongoURI, { useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
