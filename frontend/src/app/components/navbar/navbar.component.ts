import { ConfigService } from './../../services/config.service';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

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


  constructor( private userService: UserService , private config: ConfigService ) { 
    this.userSession = this.userService.getStoredUSer();
    this.userService.settingsUser$.subscribe(data => {
      this.userSession = data;


      if( this.userSession ){
      this.urlImagenProfile = `${this.config.GLOBAL.url}/get-image-user/${this.userSession.image}`;

    }
    })
  }


  ngOnInit() {

  }

}
