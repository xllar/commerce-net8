import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable() // Add this decorator
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr : ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {

          if(error.status === 400){
            if(error.error.errors){
              throw error.error;
            }else{
              this.toastr.error(error.error.message, error.status.toString())
              window.alert('error')
            }
            
          }
          if(error.status === 401){
            this.toastr.error(error.error.message, error.status.toString())
            window.alert('401 error detected!')
          }

          if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }

          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {state: {
              error:error.error
            }} ;
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
