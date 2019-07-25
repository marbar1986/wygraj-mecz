import {GameOverGuestComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GameOverGuestRoutingModule} from "./game-over-guest.routing.module";
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    GameOverGuestComponent,
  ],
  imports:[
    CommonModule,
    GameOverGuestRoutingModule
  ]
})

export class GameOverGuestModule{

}
