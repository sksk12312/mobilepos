import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string) {
    // demo stub
    return Promise.resolve({ success: true, user: username });
  }
}
