
import { LoggedPlayerComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const loggedRouting: Routes = [
  {
  path:"",
  component: LoggedPlayerComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(loggedRouting)],
  exports:[RouterModule]
})


export class LoggedRoutingModule{

}
