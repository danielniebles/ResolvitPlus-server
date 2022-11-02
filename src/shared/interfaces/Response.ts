import { HttpStatus } from '@nestjs/common';

export interface Response<T> {
  data: T;
  code: HttpStatus;
}
