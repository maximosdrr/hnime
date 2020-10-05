import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(name: string) {
    super(`${name || ''} não foi encontrado`, HttpStatus.NOT_FOUND);
  }
}
