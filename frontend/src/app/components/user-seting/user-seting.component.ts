import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-seting',
  templateUrl: './user-seting.component.html',
  styles: []
})
export class UserSetingComponent implements OnInit {

  title: string = 'User Setings';
  userData: any;
  userToken: string;
  formUserSeting: FormGroup;
  paternMailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  alertMessage: string;
  isShow: boolean = true;




  constructor( private userService: UserService ) {

    this.userData = this.userService.getStoredUSer();
    this.userToken = this.userService.getStoredToken();
    console.log('DATOS AL CARGAR DOCMENTO',this.userData);
    console.log('DATOS AL CARGAR DOCMENTO',this.userToken);

    this.formUserSeting = new FormGroup ({
      '_id': new FormControl (this.userData._id),
      'token': new FormControl(this.userToken),
      'name': new FormControl(this.userData.name, Validators.required),
      'surname': new FormControl(this.userData.surname, Validators.required ),
      'email': new FormControl(this.userData.email , [
          Validators.required,
          Validators.pattern(this.paternMailValidation)
          ]),
      // 'password': new FormControl('', [Validators.required, Validators.minLength(4)] ),
      // 'passwordSim': new FormControl()

    })

   }

  ngOnInit() {

  }

  updateUser( ){
    // console.log(this.formUserSeting.value);
    this.userService.updateUser( this.formUserSeting.value ).subscribe(
      res => {

        this.userData = res;
        this.userService.setStoredUser(this.userData);
        // Si la BBDD no devuelve el objeto actualizado directamnte, tendríamos que setearlo previamiente en el localstorage de este modo
        // this.userService.setStoredUser(this.formUserSeting.value);
        this.userData = this.userService.getStoredUSer();
        // console.log('DESPUES DE LA ACTUALIZACION', this.userData);
        this.alertMessage = 'Datos actualizados correctamente';

        // emitimos los cambios para el nombre de usuario que esta en el navbar
       // como alternativa lo hacemos con js puro a través del dom
       document.getElementById('nameUserSession').innerHTML = `Bienvenido ${this.userData.name} ${this.userData.surname}`;

      },
      
      error => console.log(error)
    )
  }

}
