
import { GamechosseComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const gamechosseRouting: Routes = [
  {
  path:"",
  component: GamechosseComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(gamechosseRouting)],
  exports:[RouterModule]
})


export class GamechosseRoutingModule{

}
