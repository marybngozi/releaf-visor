import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  ping() {
    return this.userService.ping();
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() payload: LoginDto, @Res() res: Response) {
    return this.userService.login(payload, res);
  }
}
