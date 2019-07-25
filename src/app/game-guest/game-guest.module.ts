import {GameGuestComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GameGuestRoutingModule} from "./game-guest.routing.module";
import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations:[
    GameGuestComponent
  ],
  imports:[
    CommonModule,
    GameGuestRoutingModule,
    SharedModule
  ]
})

export class GameGuestModule{

}
