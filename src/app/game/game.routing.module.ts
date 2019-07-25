
import { GameComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const gameRouting: Routes = [
  {
  path:"",
  component: GameComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(gameRouting)],
  exports:[RouterModule]
})


export class GameRoutingModule{

}
