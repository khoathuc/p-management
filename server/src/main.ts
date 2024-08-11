declare const module: any;

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configSwagger } from "@common/swagger/swagger.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //swagger config
    configSwagger(app);

    await app.listen(process.env.PORT);

    //hot reload configs
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
