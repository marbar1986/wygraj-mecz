import {LogInComponent} from "./index";
import {CommonModule} from "@angular/common";
import {LogInRoutingModule} from "./log-in.routing.module";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    LogInComponent,
  ],
  imports:[
    CommonModule,
    LogInRoutingModule,
    ReactiveFormsModule
  ]
})

export class LogInModule{

}
