import { Injectable } from '@nestjs/common';
import { RabbitmqRepository } from "@shared/repositories/rabbitmq/rabbitmq.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly rabbitmqRepository: RabbitmqRepository,
  ) {}

  async sendUserInfo(): Promise<Object> {
    const queueName = 'user-info';
    await this.rabbitmqRepository.sendToQueue(queueName, {id: 1,});

    return {
      name: 'Sending Queue',
      message: 'success send message',
    };
  }
}
