import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditCardComponent } from './Credit-card-formatter/credit-card/credit-card.component';
import { CreditCardFormatPipe } from './Pipes/credit-card-format.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { FormsComponent } from './forms/forms.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserstableComponent } from './userstable/userstable.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component'
@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponent,
    CreditCardFormatPipe,
    SortPipe,
    FormsComponent,
    UserstableComponent,
    NavbarComponent,
    LoginComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
