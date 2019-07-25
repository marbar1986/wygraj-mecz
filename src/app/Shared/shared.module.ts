import { NgModule } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { ChatComponent } from '../chat';


@NgModule({
  declarations:[
    TimerComponent,
    ChatComponent
  ],
  imports:[
  ],
  exports:[TimerComponent,ChatComponent]
})

export class SharedModule{}
