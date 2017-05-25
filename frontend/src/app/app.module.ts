import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Componentes
import { AppComponent } from './app.component';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { EditarArtistaComponent } from './components/artistas/editar-artista.component';

// Services
import { UserService } from './services/user.service';
import { ConfigService } from './services/config.service';
import { AuthService } from './services/auth-service.service';
import { ArtistService } from './services/artist.service';
import { UploadService } from './services/upload.service';
import { AlbumService } from './services/album.service';

// Routes
import { APP_ROUTING } from './app.routes';
import { UserSetingComponent } from './components/user-seting/user-seting.component';
import { ArtistasComponent } from './components/artistas/artistas.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NoPhotoPipe } from './pipes/no-photo.pipe';
import { DetalleArtistaComponent } from './components/artistas/detalle-artista.component';


@NgModule({
  declarations: [
    AppComponent,
    IdentificacionComponent,
    UserRegisterComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    UserSetingComponent,
    ArtistasComponent,
    AlbumsComponent,
    BuscarComponent,
    ErrorPageComponent,
    EditarArtistaComponent,
    NoPhotoPipe,
    DetalleArtistaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    UserService,
    ConfigService,
    AuthService,
    ArtistService,
    UploadService,
    AlbumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
