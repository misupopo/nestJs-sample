import { Injectable, Global } from '@nestjs/common';

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
}
