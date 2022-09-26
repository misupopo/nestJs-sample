import { PrismaService } from './prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Food } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
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

  @Get('foods')
  getFoods(): Promise<Food[]> {
    return this.prismaService.food.findMany();
  }
}
