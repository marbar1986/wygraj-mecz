import {HistoryComponent} from "./index";
import {CommonModule} from "@angular/common";
import {HistoryRoutingModule} from "./history.routing.module";
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    HistoryComponent
  ],
  imports:[
    CommonModule,
    HistoryRoutingModule
  ]
})

export class HistoryModule{

}
