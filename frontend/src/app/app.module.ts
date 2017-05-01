import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IdentificacionComponent } from './components/identificacion/identificacion.component';

import { UserService } from './services/user.service';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    IdentificacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
