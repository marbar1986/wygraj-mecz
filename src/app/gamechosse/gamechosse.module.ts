import {GamechosseComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GamechosseRoutingModule} from "./gamechosse.routing.module";
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    GamechosseComponent
  ],
  imports:[
    CommonModule,
    GamechosseRoutingModule
  ]
})

export class GamechosseModule{

}
