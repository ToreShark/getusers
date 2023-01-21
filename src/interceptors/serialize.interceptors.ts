import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { FilterDto } from 'src/users/dto/filter-status.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log('I am running before the handler', context);
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(FilterDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
