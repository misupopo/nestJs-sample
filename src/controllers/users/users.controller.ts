import { Controller, Get } from '@nestjs/common';
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getUserDetail(): { id: number } {
    return { id: 1,};
  }

  @Get('list')
  getUserList(): Array<Object> {
    return [{ id: 1, name: 'John Doe',}];
  }

  @Get('send')
  async sendUserInfo(): Promise<Object> {
    return await this.usersService.sendUserInfo();
  }
}
