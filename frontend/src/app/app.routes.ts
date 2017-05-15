import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserSetingComponent } from './components/user-seting/user-seting.component';
import { AuthService } from './services/auth-service.service';

//componentes
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: UserRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'setings', component: UserSetingComponent, canActivate: [AuthService] },
  { path: '**', pathMatch:'full', redirectTo: '/' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);