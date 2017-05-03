import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';

import { UserService } from './services/user.service';
import { ConfigService } from './services/config.service';
import { UserRegisterComponent } from './components/user-register/user-register.component';

@NgModule({
  declarations: [
    AppComponent,
    IdentificacionComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
