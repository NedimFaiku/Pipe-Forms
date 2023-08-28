import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { UserstableComponent } from './userstable/userstable.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '', component: FormsComponent
  },
  {
    path: 'signup', component: FormsComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'users', component: UserstableComponent, canActivate: mapToCanActivate([AuthGuard])
  },
  {
    path: 'profile/:userId', component: ProfilePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
