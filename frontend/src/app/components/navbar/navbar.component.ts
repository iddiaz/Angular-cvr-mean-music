import { ConfigService } from './../../services/config.service';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .img-profile {
      width: 30px;
      border-radius: 100%;
    }
  `]
})
export class NavbarComponent implements OnInit {

  userSession: User;
  urlImagenProfile: string;


  constructor( 
    public authService: AuthService,
    private userService: UserService, 
    private config: ConfigService, 
  ) { 
    this.userSession = this.userService.getStoredUSer();
    this.userService.settingsUser$.subscribe(data => {
      this.userSession = data;


      if( this.userSession ){
      this.urlImagenProfile = `${this.config.GLOBAL.url}/get-image-user/${this.userSession.image}`;

    }
    })
  }


  ngOnInit() {
    console.log('El valor de autenticated: ', this.authService.isAutenticated );

  }

}
