import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { format } from "date-fns";
import { Response } from "@interfaces/interfaces";
import { Reflector } from "@nestjs/core";
import { RESPONSE_MESSAGE_METADATA } from "@decorators/response.message.decorator";

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
	constructor(private reflector: Reflector) {}
	
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((res: unknown) => this.responseHandler(res, context)),
            catchError((err: HttpException) =>
                throwError(() => this.errorHandler(err, context))
            )
        );
    }

    errorHandler(exception: HttpException, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            status: false,
            statusCode: status,
            path: request.url,
            message: exception.message,
            result: exception,
            timestamp: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
        });
    }

    responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = response.statusCode;
		const message =
		this.reflector.get<string>(
		  RESPONSE_MESSAGE_METADATA,
		  context.getHandler(),
		) || 'success';

        return {
            status: true,
            path: request.url,
            statusCode,
			message: message,
            data: res,
            timestamp: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
        };
    }
}
