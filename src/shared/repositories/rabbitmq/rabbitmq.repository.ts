import { Injectable } from '@nestjs/common';
import * as amqplib from "amqplib";

@Injectable()
export class RabbitmqRepository {
  connection: any;
  channel: any;

  async onModuleInit() {
    const virtualHost = '/';
    const portNumber = process.env.RABBITMQ_PORT;
    const hostAddress = process.env.RABBITMQ_HOST;
    const url = `amqp://guest:guest@${hostAddress}:${portNumber}/${virtualHost}`;

    try {
      this.connection = await amqplib.connect(url);
      this.channel = await this.connection.createChannel();
      console.log('created rabbitmq connection', url);
    } catch (e) {
      console.log(e);
    }
  }

  async sendToQueue(queueName: string, msg: Object) {
    await this.channel.assertQueue(queueName, {durable: true});
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
  }
}
