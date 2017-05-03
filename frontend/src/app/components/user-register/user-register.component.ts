// aproximacion de trabajo por data
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent implements OnInit {

  formRegister: FormGroup;
  paternMailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor( private userService: UserService) {

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
    console.log(this.formRegister.value);
    console.log(this.formRegister);

    // this.formRegister.reset();
  }

}
