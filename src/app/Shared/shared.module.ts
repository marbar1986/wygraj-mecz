import { NgModule } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { ChatComponent } from '../chat';
import { AddContactComponent } from '../add-contact';
import { DeleteContactComponent } from '../delete-contact';
import { DeleteExistingContactComponent } from '../delete-existing-contact';
import { ConfirmDeleteExistingContactComponent } from '../confirm-delete-existing-contact';


@NgModule({
  declarations:[
    TimerComponent,
    ChatComponent,
    AddContactComponent,
    DeleteContactComponent,
    DeleteExistingContactComponent,
    ConfirmDeleteExistingContactComponent
  ],
  imports:[
  ],
  exports:[TimerComponent,ChatComponent,AddContactComponent,DeleteContactComponent,DeleteExistingContactComponent,ConfirmDeleteExistingContactComponent]
})

export class SharedModule{}
