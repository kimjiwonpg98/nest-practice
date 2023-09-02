import { Body, Controller, Get, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request, @Body() Body, @Param() param): string {
    return this.appService.getHello();
  }
}
