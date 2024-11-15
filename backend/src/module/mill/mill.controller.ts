import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  // UseGuards
} from '@nestjs/common';
import { MillService } from './mill.service';
import { QueryMillDto, MillDto } from './mill.dto';
// import { AuthGuard } from 'src/guard/auth.guard';

@Controller('mill')
// @UseGuards(AuthGuard)
export class MillController {
  constructor(private readonly millService: MillService) {}

  @Get()
  listMill(@Query() payload: QueryMillDto) {
    return this.millService.listMill(payload);
  }

  @Post()
  createOrEdit(@Body() payload: MillDto) {
    return this.millService.createOrEditMill(payload);
  }
}
