import { Global, Module } from "@nestjs/common";
import { BaseDBService } from "./basedb.service";

@Global()
@Module({
    providers: [BaseDBService],
    exports: [BaseDBService],
})

export class BaseDBModule {}
