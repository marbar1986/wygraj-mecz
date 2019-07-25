import {RegisterComponent} from "./index";
import {CommonModule} from "@angular/common";
import {RegisterRoutingModule} from "./register.routing.module";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    RegisterComponent,
  ],
  imports:[
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ]
})

export class RegisterModule{

}
