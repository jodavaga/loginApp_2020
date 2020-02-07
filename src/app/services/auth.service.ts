import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Register
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyA_4nYyU0N2b4T8AiVidro5ubh23nm5oxA';


  constructor(private http: HttpClient) { }

  loginUser( user: UsuarioModel ) {

    const dataUser = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }:signInWithPassword?key=${ this.apiKey }`, dataUser);

  }

  createNewUser( user: UsuarioModel ) {

    const dataUser = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }:signUp?key=${ this.apiKey }`, dataUser);

  }
}
