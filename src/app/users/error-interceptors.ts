import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HandleErrorComponent } from '../handle-error/handle-error.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private dialog: MatDialog
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknow error occured';
        if (error.error.message) {
          errorMessage = error.error.message;
          console.log(errorMessage);
        }
        this.dialog.open(HandleErrorComponent, {data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }

}
