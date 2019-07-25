
import { GameVsGuestComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const gameVsGuestRouting: Routes = [
  {
  path:"",
  component: GameVsGuestComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(gameVsGuestRouting)],
  exports:[RouterModule]
})


export class GameVsGuestRoutingModule{

}
