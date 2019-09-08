import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseModule } from './database/database.module';
import { LoggerMiddleware } from './auth/logger.middleware';


@Module({
  imports: [AuthModule, databaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/logform', method: RequestMethod.GET },
         //{ path: 'auth/kill', method: RequestMethod.GET },
      )
      .forRoutes(
        { path: '/menu', method: RequestMethod.GET },
        {path: '/reg', method: RequestMethod.GET },
        {path: '/editpro', method: RequestMethod.GET },
        );
      // .forRoutes(AppController);
  }
}
