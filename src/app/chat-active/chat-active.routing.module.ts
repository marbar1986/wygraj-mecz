
import { ChatActiveComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const chatActiveRouting: Routes = [
  {
  path:"",
  component: ChatActiveComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(chatActiveRouting)],
  exports:[RouterModule]
})


export class ChatActiveRoutingModule{

}
