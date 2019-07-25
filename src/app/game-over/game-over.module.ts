import {GameOverComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GameOverRoutingModule} from "./game-over.routing.module";
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    GameOverComponent,
  ],
  imports:[
    CommonModule,
    GameOverRoutingModule
  ]
})

export class GameOverModule{

}
