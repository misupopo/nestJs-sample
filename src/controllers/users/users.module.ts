import { Module } from '@nestjs/common';
import { UsersController } from "./users.controller";
import { RabbitmqRepository } from '@shared/repositories/rabbitmq/rabbitmq.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [RabbitmqRepository, UsersService],
})
export class UsersModule {
}
