import { Module, ValidationPipe } from "@nestjs/common";
import { PrismaModule } from "@db/prisma.module";
import { AuthModule } from "@modules/auth/auth.module";
import { WorkspaceModule } from "@modules/workspaces/workspaces.module";
import { APP_PIPE } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
@Module({
    imports: [
        AuthModule, 
        PrismaModule, 
        WorkspaceModule, 
        PassportModule.register({ session: true })
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
