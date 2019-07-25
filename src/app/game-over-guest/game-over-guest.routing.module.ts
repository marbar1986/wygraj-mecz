
import { GameOverGuestComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const gameOverGuestRouting: Routes = [
  {
  path:"",
  component: GameOverGuestComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(gameOverGuestRouting)],
  exports:[RouterModule]
})


export class GameOverGuestRoutingModule{

}
