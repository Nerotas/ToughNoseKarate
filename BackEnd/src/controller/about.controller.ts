import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller('about')
export class AboutController {
  @Get('')
  @HttpCode(200)
  async about() {
    // TODO: Put some actual health tests like making connections to DB.
    return Promise.resolve();
  }
}
