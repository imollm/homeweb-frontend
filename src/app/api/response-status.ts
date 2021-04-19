import {HttpErrorResponse} from '@angular/common/http';
import {StatusCodes} from './status-codes.enum';

export class ResponseStatus {

  static displayErrorMessage(httpError: HttpErrorResponse): string {
    switch (httpError.status) {
      case StatusCodes.HTTP_UNAUTHORIZED:
        return this.unauthorized(httpError);
      case StatusCodes.HTTP_NOT_FOUND:
        return this.notFound(httpError);
      case StatusCodes.HTTP_UNPROCESSABLE_ENTITY:
        return this.unprocessableEntity(httpError);
      case StatusCodes.HTTP_INTERNAL_SERVER_ERROR:
        return this.internalServerError(httpError);
      default:
        return 'Some error occurs, contact with admin';
    }
  }

  private static unauthorized(httpError: HttpErrorResponse): string {
    if (httpError.error) {
      return httpError.error.message;
    }
    return httpError.error.statusText;
  }

  private static notFound(httpError: HttpErrorResponse): string {
    if (httpError.error) {
      return httpError.error.message;
    }
    return httpError.error.statusText;
  }

  private static unprocessableEntity(httpError: HttpErrorResponse): string {
    if (httpError.error.errors.name[0]) {
      return httpError.error.errors.name[0];
    }
    return httpError.error.statusText;
  }

  private static internalServerError(httpError: HttpErrorResponse): string {
    if (httpError.error) {
      return httpError.error;
    }
    return httpError.error.statusText;
  }
}
