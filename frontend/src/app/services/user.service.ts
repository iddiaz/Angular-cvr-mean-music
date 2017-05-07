import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
// import { Observable } from 'rxjs/observable';
import { ConfigService } from './config.service';
import { User } from './../models/user.model';


@Injectable()
export class UserService {
  url: string;
  userData: any;
  token: string;
  sessionUser: any;
  sessionToken: any;
  isLoaded;

  constructor( private http: Http, private config: ConfigService) {
    this.url = config.GLOBAL.url;

  }
  // envia los datos del formulario de login al servidor
  singUp( params: User ) {
    // url de petición
    let url = `${this.url}/login`;
    let body = JSON.stringify( params);
    let headers = new Headers({'Content-type':'application/json'});

    return this.http.post(url, body, {headers})
      .map(res => {
        this.userData = res.json().user;
        // console.log('En EL servicio',this.userData);
        return this.userData;
      })
  }

  register( params ){
    let url = `${this.url}/register`;
    params.role = 'ROLE_USER';
    let body = params;
    // Esto no es necesario trabajando con mongo
    // let body = JSON.stringify( params );
    // let headers = new Headers({'Content-type': 'application/json'});

    return this.http.post(url, body ).map( res => res.json().user );
  }

  updateUser( params ) {
    let url =`${this.url}/update-user/${params._id}`;
    let body = JSON.stringify( params );
    let headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': this.getStoredToken()
    });
    
    return this.http.put(url, body,{headers}).map( res => res.json().user );

  }

  getToken( params, hash ){
    let url = `${this.url}/login`;
    params.gethash = hash;

    return this.http.post(url, params ).map(res => {
      this.token = res.json().token;
      return this.token;
    });

  }
  // almacenamos la data de usuario en loclastorage
  storeData( user, token){
    if(user._id){
      localStorage.setItem('sessionUser', JSON.stringify(user));
      localStorage.setItem('sessionToken', token);
      console.log('se han guardado los datos en localstorage');
    }
  }

  getStoredUSer(){
    return JSON.parse(localStorage.getItem('sessionUser'));
  }

  setStoredUser(userData){
    console.log('se han actualizado los datos en localstorage');
    return localStorage.setItem('sessionUser', JSON.stringify(userData));
    
  }

  getStoredToken(){
    return localStorage.getItem('sessionToken');
  }

  clearLocalSession(){
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionToken');
  }



}
