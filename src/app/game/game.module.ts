import {GameComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GameRoutingModule} from "./game.routing.module";
import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations:[
    GameComponent
  ],
  imports:[
    CommonModule,
    GameRoutingModule,
    SharedModule
  ]
})

export class GameModule{

}
