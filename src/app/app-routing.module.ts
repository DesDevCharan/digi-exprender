import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpGenderComponent } from './components/exp-gender/exp-gender.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: ExpGenderComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
