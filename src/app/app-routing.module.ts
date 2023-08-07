import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { UserstableComponent } from './userstable/userstable.component';

const routes: Routes = [
  {
    path: '', component: FormsComponent
  },
  {
    path: 'signup', component: FormsComponent
  },
  {
    path: 'users', component: UserstableComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
