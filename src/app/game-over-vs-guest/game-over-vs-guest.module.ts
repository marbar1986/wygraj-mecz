import {GameOverVsGuestComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GameOverVsGuestRoutingModule} from "./game-over-vs-guest.routing.module";
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    GameOverVsGuestComponent,
  ],
  imports:[
    CommonModule,
    GameOverVsGuestRoutingModule
  ]
})

export class GameOverVsGuestModule{

}
