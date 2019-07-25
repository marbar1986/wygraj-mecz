
import { GameOverVsGuestComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const gameOverVsGuestRouting: Routes = [
  {
  path:"",
  component: GameOverVsGuestComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(gameOverVsGuestRouting)],
  exports:[RouterModule]
})


export class GameOverVsGuestRoutingModule{

}
