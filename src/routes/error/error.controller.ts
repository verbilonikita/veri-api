import { All, Controller, HttpException, HttpStatus } from '@nestjs/common';

@Controller('*')
export class ErrorController {
  @All()
  handleUnexpectedRoute() {
    throw new HttpException('This route does not exist.', HttpStatus.NOT_FOUND);
  }
}
