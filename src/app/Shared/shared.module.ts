import { NgModule } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { ChatComponent } from '../chat';
import { AddContactComponent } from '../add-contact';
import { DeleteContactComponent } from '../delete-contact';


@NgModule({
  declarations:[
    TimerComponent,
    ChatComponent,
    AddContactComponent,
    DeleteContactComponent
  ],
  imports:[
  ],
  exports:[TimerComponent,ChatComponent,AddContactComponent,DeleteContactComponent]
})

export class SharedModule{}
