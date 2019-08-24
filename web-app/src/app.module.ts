import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './auth/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService,AuthService],
})
export class AppModule {
configure(consumer:MiddlewareConsumer){
consumer
.apply(LoggerMiddleware)
.forRoutes(AuthController);
}

}
