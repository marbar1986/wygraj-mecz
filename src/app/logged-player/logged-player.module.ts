import {LoggedPlayerComponent} from "./index";
import {CommonModule} from "@angular/common";
import {LoggedRoutingModule} from "./logged-player.routing.module";
import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations:[
    LoggedPlayerComponent,
  ],
  imports:[
    CommonModule,
    LoggedRoutingModule,
    SharedModule
  ]
})

export class LoggedModule{

}
