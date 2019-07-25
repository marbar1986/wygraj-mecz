
import { HomeComponent } from '.';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const homeRouting: Routes = [
  { path: '',
   redirectTo: '/home',
   pathMatch: 'full'
 },
  {
  path:"home",
  component: HomeComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(homeRouting)],
  exports:[RouterModule]
})


export class HomeRoutingModule{

}
