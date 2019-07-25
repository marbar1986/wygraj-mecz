
import { GuestComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const guestRouting: Routes = [
  {
  path:"",
  component: GuestComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(guestRouting)],
  exports:[RouterModule]
})


export class GuestRoutingModule{

}
