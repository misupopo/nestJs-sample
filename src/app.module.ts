import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@config/config.module';
import { ControllersModule } from './controllers/controllers.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ControllersModule, PrismaModule, ConfigModule, NestConfigModule.forRoot({
    load: [configuration],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
