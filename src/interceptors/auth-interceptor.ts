import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    // Verifica se a url esta sendo realizada para o servico do S3, se estiver, nao devera trafegar o token
    let requestToS3 = req.url.includes('loja-virtual-pwa.s3');

    if (localUser && !requestToS3) {
      const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
      return next.handle(authReq);
    }
    else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
