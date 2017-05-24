import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './services/auth-service.service';
//componentes
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserSetingComponent } from './components/user-seting/user-seting.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistasComponent } from './components/artistas/artistas.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { EditarArtistaComponent } from './components/artistas/editar-artista.component';
import { DetalleArtistaComponent } from './components/artistas/detalle-artista.component';

const routes: Routes = [
  { path: '', component: UserRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'artistas', component: ArtistasComponent },
  { path: 'detalle-artista/:idArtist', component: DetalleArtistaComponent },
  { path: 'artista/:idArtist', component: EditarArtistaComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'setings', component: UserSetingComponent, canActivate: [AuthService] },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

export const APP_ROUTING = RouterModule.forRoot(routes);