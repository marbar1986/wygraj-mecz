import {GuestComponent} from "./index";
import {CommonModule} from "@angular/common";
import {GuestRoutingModule} from "./guest.routing.module";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    GuestComponent,
  ],
  imports:[
    CommonModule,
    GuestRoutingModule,
    ReactiveFormsModule
  ]
})

export class GuestModule{

}
