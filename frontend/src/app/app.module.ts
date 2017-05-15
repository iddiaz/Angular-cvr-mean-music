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

// Services
import { UserService } from './services/user.service';
import { ConfigService } from './services/config.service';
import { AuthService } from './services/auth-service.service';

// Routes
import { APP_ROUTING } from './app.routes';
import { UserSetingComponent } from './components/user-seting/user-seting.component';

@NgModule({
  declarations: [
    AppComponent,
    IdentificacionComponent,
    UserRegisterComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    UserSetingComponent
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
