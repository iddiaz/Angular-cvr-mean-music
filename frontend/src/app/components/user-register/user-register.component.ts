import { Router } from '@angular/router';
// aproximacion de trabajo por data
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent implements OnInit {


  formRegister: FormGroup;
  paternMailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  userRegister: User;
  isRegister: boolean = false;
  sessionToken: string;


  constructor( private userService: UserService, private router: Router ) {

    this.formRegister = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'surname': new FormControl('', Validators.required ),
      'email': new FormControl('', [
          Validators.required,
          Validators.pattern(this.paternMailValidation)
          ]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)] ),
      'passwordSim': new FormControl()
    });

    this.formRegister.controls['passwordSim'].setValidators([
        Validators.required,
        this.isEqualsPasswords.bind( this.formRegister )
    ]);



    

  }

  ngOnInit() {
    
      this.sessionToken = this.userService.getStoredToken();
      // console.log('LA SESSION ES:', this.sessionToken );
      if(this.sessionToken){
        this.router.navigate(['home']);
      }
    
  }

  isEqualsPasswords( control: FormControl ): { [s:string]:boolean } {
    // console.log(this);
    let forma: any = this;
    // no olvidar el bindeo del this para establecer el contexto correcto si no arroja un error
    if( control.value !== forma.controls['password'].value ){
      return {
        noiguales: true
      }
    }
    return null;
  }

  register(){
    // console.log(this.formRegister.value);
    // this.userRegister = this.formRegister.value;
    // console.log(this.formRegister);
    // console.log('modelo de usuario', this.userRegister);

    this.userService.register( this.formRegister.value ).subscribe(
      res => {
        this.userRegister = res;
        if(this.userRegister._id) {
          this.isRegister = true;

        }

      },
      error => {
        this.isRegister = false;
        throw new Error (error)
      }
    );
    this.formRegister.reset();
  }

}
