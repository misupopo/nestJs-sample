import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUserDetail(): { id: number } {
    return {
      id: 1,
    };
  }

  @Get('list')
  getUserList(): Array<Object> {
    return [{ id: 1, name: 'John Doe',}];
  }
}
