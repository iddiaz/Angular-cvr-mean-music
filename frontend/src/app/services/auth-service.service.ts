import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { UserService } from './user.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable()
export class AuthService implements CanActivate {

  private userSession: User;
  public isAutenticated: boolean = false;

  constructor( private userService: UserService, private router: Router ) {
    console.log('Sesision de usuario:', this.userSession);
    console.log('Servicio activo de guard');
     this.userService.settingsUser$.subscribe( data => {
       this.userSession = data;
       console.log('Sesision de usuario:', this.userSession);
       if(this.userSession){
         this.isAutenticated = true;
       }
       else {
         this.isAutenticated = false;
       }
     });
  }
  // de momento no se esta usando el ActivatedRouteSnapshot ni RouterStateSnapshot por lo que no hace falta
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
    console.log('Se esta llamando el guard');
   
    if (this.isAutenticated){
      console.log('EL GUARD PASO');
      return true;
    }
    else{
      console.error('Bloqueado por el GUARD');
      this.router.navigate(['']);
      return false;
    }
  

  }
  

}
