import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('about')
export class AboutController {
  @Get('')
  @HttpCode(200)
  async about() {
    // TODO: Put some actual health tests like making connections to DB.
    return Promise.resolve();
  }
}
