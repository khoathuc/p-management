import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  someProtectedRoute(@Req() req) {
    return { message: 'Access Resource', email: req.email };
  }
}
