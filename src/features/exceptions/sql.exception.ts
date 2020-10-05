import { HttpException, HttpStatus } from '@nestjs/common';

export class SqlException extends HttpException {
  constructor(e) {
    super(
      `${e.message || 'Erro desconhecido'}`,
      e.status || HttpStatus.BAD_REQUEST,
    );
  }
}
