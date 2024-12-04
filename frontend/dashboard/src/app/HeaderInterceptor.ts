import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request and add necessary headers
        const headers = req.headers
            .set('Content-Type', 'application/json')
            .set('x-auth-token', localStorage.getItem('token') || ''); // Get token from local storage
        const authReq = req.clone({ headers });
        return next.handle(authReq);
    }
}
