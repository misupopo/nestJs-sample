import { PrismaService } from './prisma/prisma.service';
import { Controller, Get, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Food } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.warn('this is warn level');
    this.logger.debug('this is debug level');
    this.logger.info('this is info level');
    this.logger.error('this is error level');
    console.log('this is console.log');
    return this.appService.getHello();
  }

  // 変数の共通かはできないみたい
  @Get('global/variable/set')
  async globalVariableTest(): Promise<any> {
    return await this.appService.globalVariableSet();
  }

  @Get('global/variable/export')
  async test(): Promise<any> {
    const result = await this.appService.globalVariableExport();
    console.log(`result: ${result}`)
    return {
      result: 'success'
    };
  }

  @Get('rabbitmq/receive')
  async receive(): Promise<any> {
    console.log('start rabbitmq');
    await this.appService.rabbitMQReceive();
  }

  @Get('rabbitmq/receive/wait')
  async receiveWait(
    @Body('wait_queue_name') waitQueueName: string,
    @Body('sequence_id') sequenceId: string,
  ): Promise<any> {
    console.log(`receive rabbitmq wait: ${waitQueueName}`);
    await this.appService.rabbitMQReceiveWait(waitQueueName, sequenceId);
  }

  @Get('rabbitmq/send')
  async send(
    @Body('destination_queue_name') destinationQueueName: string,
    @Body('message') message: string,
  ): Promise<any> {
    console.log(`send rabbitmq: ${destinationQueueName}`);
    await this.appService.rabbitMQReceiveSend(destinationQueueName, message);
  }

  @Get('foods')
  getFoods(): Promise<Food[]> {
    return this.prismaService.food.findMany();
  }
}
