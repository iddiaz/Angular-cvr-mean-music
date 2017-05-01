import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user.model';
import { NgForm } from '@angular/forms/src/directives';

import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.scss']
})
export class IdentificacionComponent implements OnInit {

  userLogin: User = {
    email: null,
    password: null,
    role: 'ROLE_USER'
  };
  isLoged: boolean = false;
  sessionUser: any;
  sessionToken: string;
  errorMessage: string;
  status: string;


  constructor( private userService: UserService) {}

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
  }

}
