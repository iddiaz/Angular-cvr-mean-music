
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
  sessionUser: User;
  sessionToken: string;
  errorMessage: string;
  status: string;
 

  constructor( private userService: UserService, private router: Router ) {}

  ngOnInit() {
    this.sessionUser = this.userService.getStoredUSer();
    this.sessionToken = this.userService.getStoredToken();

    if(this.sessionUser){
      this.isLoged = true;
      this.userService.settingUserProfile$( this.sessionUser );

    }

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

          //Emitimos datos de sesión para el componente que le interese.
          this.userService.settingUserProfile$( this.sessionUser );

          // Navegar a la página principal
          this.router.navigate( ['home'] );
          
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
    //Emitimos datos de sesión a toda la aplicacion
    this.sessionUser = null;
    this.sessionToken = null;
    this.userService.settingUserProfile$( this.sessionUser );
  }

}
