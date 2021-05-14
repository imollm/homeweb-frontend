import {HttpErrorResponse} from '@angular/common/http';
import {StatusCodes} from './status-codes.enum';

export class ResponseStatus {

  static displayErrorMessage(httpError: HttpErrorResponse): string {
    switch (httpError.status) {
      case StatusCodes.HTTP_UNAUTHORIZED:
        return this.unauthorized(httpError);
      case StatusCodes.HTTP_NOT_FOUND:
        return this.notFound(httpError);
      case StatusCodes.HTTP_CONFLICT:
        return this.conflict(httpError);
      case StatusCodes.HTTP_UNPROCESSABLE_ENTITY:
        return this.unprocessableEntity(httpError);
      case StatusCodes.HTTP_INTERNAL_SERVER_ERROR:
        return this.internalServerError(httpError);
      default:
        return 'Some error occurs, contact with admin';
    }
  }

  // HTTP ERROR 401
  private static unauthorized(httpError: HttpErrorResponse): string {
    if (httpError.error) {
      return httpError.error.message;
    }
    return httpError.error.statusText;
  }

  // HTTP ERROR 404
  private static notFound(httpError: HttpErrorResponse): string {
    if (httpError.error) {
      return httpError.error.message;
    }
    return httpError.error.statusText;
  }

  // HTTP ERROR 409
  private static conflict(httpError: HttpErrorResponse): string {
    if (httpError.error.message) {
      return httpError.error.message;
    }
    return httpError.error.statusText;
  }

  // HTTP ERROR 422
  private static unprocessableEntity(httpError: HttpErrorResponse): string {
    if (httpError.error.errors) {
      let message = '';
      const errors = httpError.error.errors;
      Object.keys(errors).forEach((key) => {
        if (key.length > 0) {
          errors[key].forEach((error) => {
            message += error + '\n';
          });
        }
      });
      return message;
    }
    return httpError.error.statusText;
  }

  // HTTP ERROR 500
  private static internalServerError(httpError: HttpErrorResponse): string {
    if (httpError.error) {
      if (typeof httpError.error === 'string') {
        return httpError.error;
      } else if (httpError.error.message && typeof httpError.error.message === 'string') {
        return httpError.error.message;
      }
    }
    return httpError.error.statusText;
  }
}
