
import { GameOverComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const gameOverRouting: Routes = [
  {
  path:"",
  component: GameOverComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(gameOverRouting)],
  exports:[RouterModule]
})


export class GameOverRoutingModule{

}
