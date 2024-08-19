declare const module: any;

import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configSwagger } from "@common/swagger/swagger.config";
import { TransformInterceptor } from "@interceptors/response.interceptors";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //swagger config
    configSwagger(app);

    //global interceptors
    app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
    
    await app.listen(process.env.PORT);

    //hot reload configs
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
