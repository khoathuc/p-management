import { Module, ValidationPipe } from '@nestjs/common';
import { PrismaModule } from '@db/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';
import { WorkspaceModule } from '@modules/workspaces/workspaces.module';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    JwtModule,
    WorkspaceModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule { }
