
import { LogInComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const logInRouting: Routes = [
  {
  path:"",
  component: LogInComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(logInRouting)],
  exports:[RouterModule]
})


export class LogInRoutingModule{

}
