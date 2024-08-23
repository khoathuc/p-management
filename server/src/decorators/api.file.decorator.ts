import { getMulterOptions } from "@common/utils/file.upload.utils";
import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

export function apiFile(
    fieldName: string = 'file', 
    required: boolean = false,
    localOptions?: {
        destination: string,
        fileSizeLimit: number,
        mimetypes: string[],
    }

) {
    const defaultOptions = getMulterOptions(
        localOptions.destination,
        localOptions.fileSizeLimit,
        ...localOptions.mimetypes
    );

    return applyDecorators(
        UseInterceptors(FileInterceptor(fieldName, defaultOptions)),
        ApiConsumes("multipart/form-data"),
        ApiBody({
            schema: {
                type: 'object',
                required: required ? [fieldName] : [],
                properties: {
                    [fieldName]: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            }
        })
    )
}