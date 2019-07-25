
import { HistoryComponent } from './index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const historyRouting: Routes = [
  {
  path:"",
  component: HistoryComponent
}
];

@NgModule({
  imports:[RouterModule.forChild(historyRouting)],
  exports:[RouterModule]
})


export class HistoryRoutingModule{

}
