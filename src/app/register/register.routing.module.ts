
import { RegisterComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const registerRouting: Routes = [
  {
  path:"",
  component: RegisterComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(registerRouting)],
  exports:[RouterModule]
})


export class RegisterRoutingModule{

}
