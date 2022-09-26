import { Injectable, Global } from '@nestjs/common';
import * as amqplib from 'amqplib';

@Global()
@Injectable()
export class AppService {
  public test: string = ''

  getHello(): string {
    return 'Hello World!';
  }

  async globalVariableSet(): Promise<any> {
    this.test = '111'

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

  async rabbitMQReceiveWait(queueName: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const virtualHost = '/';
      const portNumber = 5672;
      const hostAddress = 'localhost';
      const url = `amqp://guest:guest@${hostAddress}:${portNumber}/${virtualHost}`;

      try {
        const connection = await amqplib.connect(url);
        const channel = await connection.createChannel();

        await channel.consume(queueName, async (message) => {
          console.log(message && message.content.toString());

          if (message) {
            console.log('to ack');
            channel.ack(message);
            return resolve(message)
          }
        });
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    })
  }

  async rabbitMQReceiveSend(queueName: string, message: string): Promise<any> {
    const virtualHost = '/';
    const portNumber = 5672;
    const hostAddress = 'localhost';
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
    await send(queueName, Buffer.from(JSON.stringify(msg)));
    console.log('message send success', message);
  };
}
