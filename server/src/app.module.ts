import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule { }
