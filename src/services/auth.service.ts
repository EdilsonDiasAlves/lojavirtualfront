import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CredenciaisDto } from '../models/credenciais.dto';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { LocalUser } from '../models/local_user';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient, public localStorage: StorageService) {
  }

  authenticate(creds: CredenciaisDto) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`,
    creds,
    {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok
    };

    this.localStorage.setLocalUser(user);
  }

  logout() {
    this.localStorage.setLocalUser(null);
  }

}
