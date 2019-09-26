import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerMiddleware } from './logger.middleware';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { databaseModule } from '../database/database.module';
require('dotenv').config();
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    databaseModule,
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
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
