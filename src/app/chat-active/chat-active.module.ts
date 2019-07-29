import {ChatActiveComponent} from "./index";
import {CommonModule} from "@angular/common";
import {ChatActiveRoutingModule} from "./chat-active.routing.module";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddContactComponent } from '../add-contact';
import { SharedModule } from '../Shared/shared.module';
import { DeleteContactComponent } from '../delete-contact';


@NgModule({
  declarations:[
    ChatActiveComponent,
  ],
  imports:[
    CommonModule,
    ChatActiveRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SharedModule
  ]
  ,
  entryComponents:[
    AddContactComponent,
    DeleteContactComponent
  ]
})

export class ChatActiveModule{

}
