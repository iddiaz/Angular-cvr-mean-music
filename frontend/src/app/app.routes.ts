import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './services/auth-service.service';
//componentes
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserSetingComponent } from './components/user-seting/user-seting.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistasComponent } from './components/artistas/artistas.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { BuscarComponent } from './components/buscar/buscar.component';

const routes: Routes = [
  { path: '', component: UserRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'artistas', component: ArtistasComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'setings', component: UserSetingComponent, canActivate: [AuthService] },
  { path: '**', pathMatch:'full', redirectTo: '/' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);