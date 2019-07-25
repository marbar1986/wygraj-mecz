
import { GameGuestComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const gameGuestRouting: Routes = [
  {
  path:"",
  component: GameGuestComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(gameGuestRouting)],
  exports:[RouterModule]
})


export class GameGuestRoutingModule{

}
