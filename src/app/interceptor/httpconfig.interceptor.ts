import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import localStorageKey from '../const/localStorageConst';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem(localStorageKey.TOKEN);

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && !environment.production) {
          // tslint:disable-next-line:no-console
          console.debug('event--->>>', event);
        }
        return event;
      }));
  }
}
