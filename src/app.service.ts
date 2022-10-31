import { Injectable, Global } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
  ) {}

  public test: string = ''

  showConfig(): any {
    const { message } = this.configService.get('configuration');
    console.log(message);
    return message;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async globalVariableSet(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        const result = {
          result: 'success'
        }

        return resolve(result)
      }, (10 * 1000))
    })
  }

  async globalVariableExport(): Promise<any> {
    return this.test;
  }

  async rabbitMQReceive(): Promise<any> {
    const virtualHost = '/';
    const portNumber = 5672;
    const hostAddress = 'localhost';
    const url = `amqp://guest:guest@${hostAddress}:${portNumber}/${virtualHost}`;
    const sendQueueName = 'test-send-queue';

    try {
      const connection = await amqplib.connect(url);
      const channel = await connection.createChannel();

      await channel.consume(sendQueueName, async (message) => {
        console.log(message && message.content.toString());

        if (message) {
          channel.ack(message);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async rabbitMQReceiveWait(waitQueueName: string, sequenceId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const virtualHost = '/';
      const portNumber = process.env.RABBITMQ_PORT;
      const hostAddress = process.env.RABBITMQ_HOST;
      const url = `amqp://guest:guest@${hostAddress}:${portNumber}/${virtualHost}`;

      try {
        const connection = await amqplib.connect(url);
        const channel = await connection.createChannel();

        await channel.consume(waitQueueName, async (queueData: any) => {
          const contentMessage = queueData.content.toString();
          console.log(contentMessage);

          const parsedMessage = JSON.parse(queueData.content.toString());
          const sequence = JSON.parse(parsedMessage.message);

          console.log(`message received: ${typeof sequence.sequenceId}`);
          console.log(`message received: ${typeof sequenceId}`);

          if (sequence.sequenceId === sequenceId) {
            console.log(`received sequenceId: ${sequenceId}`);
            channel.ack(queueData);
            return resolve(queueData)
          }
        });
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    })
  }

  async rabbitMQReceiveSend(destinationQueueName: string, message: string): Promise<any> {
    const virtualHost = '/';
    const portNumber = process.env.RABBITMQ_PORT;
    const hostAddress = process.env.RABBITMQ_HOST;
    const url = `amqp://guest:guest@${hostAddress}:${portNumber}/${virtualHost}`;

    const connection = await amqplib.connect(url);
    const channel = await connection.createChannel();

    const send = async (queue: string, msg: Buffer) => {
      await channel.assertQueue(queue, {durable: true});
      return channel.sendToQueue(queue, msg)
    }

    const msg = {
      message,
      date: new Date().getTime()
    };

    // 送るメッセージの内容
    await send(destinationQueueName, Buffer.from(JSON.stringify(msg)));
    console.log('message send success', message);
  };
}
