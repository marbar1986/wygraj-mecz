import {ChatActiveComponent} from "./index";
import {CommonModule} from "@angular/common";
import {ChatActiveRoutingModule} from "./chat-active.routing.module";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    ChatActiveComponent
  ],
  imports:[
    CommonModule,
    ChatActiveRoutingModule,
    ReactiveFormsModule
  ]
})

export class ChatActiveModule{

}
