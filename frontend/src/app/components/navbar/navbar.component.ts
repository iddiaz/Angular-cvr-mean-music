import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  userSession: any;
  nombreRecibido: string;

  @Input() reciverUserDataUpdated: User;
 

  constructor( public userService: UserService ) { }

  // no es necesario indicarle la propiedad input en este caso porque el componente es hijo suyo directo
  reciverUSerData(params){
    this.userSession = params
    console.log('los datos recibidos son: ',this.userSession);
  }



  ngOnInit() {
    this.userSession = this.userService.getStoredUSer();
    // console.log('LA SESION ES ',this.userSession);
  }

}
