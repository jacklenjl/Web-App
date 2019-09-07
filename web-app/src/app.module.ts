import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseModule } from './database/database.module';


@Module({
  imports: [AuthModule, databaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
