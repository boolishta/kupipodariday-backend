import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServerException } from '../exceptions/server.exception';

@Catch(ServerException)
export class ServerExceptionFilter implements ExceptionFilter {
  catch(exception: ServerException, host: ArgumentsHost) {
    /**
     * Реализуйте обработку исключения в фильтре, чтобы вернуть ответ в нужном формате
     */
    const status = exception.getStatus();
    const message = exception.getResponse();
    const errorCode = exception.getErrorCode()

    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // меняем объект ответа
    response
      .status(status)
      .json({
        errorCode: errorCode,
        message: message,
        status: status
      });  
  }
}