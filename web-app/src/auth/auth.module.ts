
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerMiddleware } from './logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersSchema } from '../database/schemas/users.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }])],
  controllers: [AuthController],
  providers: [AuthService]

})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
         //{ path: 'auth/kill', method: RequestMethod.GET },
      )
      .forRoutes(AuthController);
  }


}
