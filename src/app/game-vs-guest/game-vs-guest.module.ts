import {GameVsGuestComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GameVsGuestRoutingModule} from "./game-vs-guest.routing.module";
import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations:[
    GameVsGuestComponent
  ],
  imports:[
    CommonModule,
    GameVsGuestRoutingModule,
    SharedModule
  ]
})

export class GameVsGuestModule{

}
