
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerMiddleware } from './logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import {UsersSchema} from '../database/schemas/users.schema';
@Module({
  imports:[MongooseModule.forFeature([{name:'Users', schema: UsersSchema}])],
  controllers:[AuthController],
  providers: [AuthService]

})
export class AuthModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(AuthController);
    }
    

}
