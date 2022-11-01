import { Module } from '@nestjs/common';
import { UsersController } from "./users.controller";
import { RabbitmqService } from '@shared/services/rabbitmq/rabbitmq.service';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [RabbitmqService, UsersService],
})
export class UsersModule {
}
