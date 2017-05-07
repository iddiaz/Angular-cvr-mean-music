
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from './../../models/user.model';
import { NgForm } from '@angular/forms/src/directives';

import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  userLogin: User = {
    email: null,
    password: null,
  };
  isLoged: boolean = false;
  sessionUser: any;
  sessionToken: string;
  errorMessage: string;
  status: string;

 
  @Output() userSessionSending = new EventEmitter();
  // @Output() tokenSending = new EventEmitter();


  

  constructor( private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.sessionUser = this.userService.getStoredUSer();
    this.sessionToken = this.userService.getStoredToken();

    if(this.sessionUser){
      this.isLoged = true;
    }
    console.log('sessionUser: ',this.sessionUser);
    console.log('sessionToken: ',this.sessionToken);

  }

  loginUser () {

    this.userService.singUp( this.userLogin ).subscribe( res => {
      // si la primera petición ha tenido exito, el usuario esta logeado
      this.sessionUser = res;

      if(this.sessionUser._id){
        this.userService.getToken( this.userLogin, 'true' ).subscribe( res=> {
          this.sessionToken = res;
          //almacenamos datos de sesion
          this.userService.storeData( this.sessionUser, this.sessionToken );
          this.isLoged = true;

          // Navegar a la página principal
          this.router.navigate( ['home'] );
          
          // emitir valor de nombre de usuario y token 
           this.userSessionSending.emit( this.sessionUser );
          //  this.tokenSending.emit(this.sessionToken);

          // Reiniciamos el formulario
          this.userLogin.email = null;
          this.userLogin.password = null;

        } );
      }
    }, error =>{
      this.errorMessage = JSON.parse(error._body).message;
      this.status = error.status;
    });

  }

  logout() {
    this.userService.clearLocalSession();
    this.isLoged = false;
    this.router.navigate(['']);
  }

}
