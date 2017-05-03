import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserSetingComponent } from './components/user-seting/user-seting.component';

//componentes
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: UserRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'setings', component: UserSetingComponent },
  { path: '**', pathMatch:'full', redirectTo: '/' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);