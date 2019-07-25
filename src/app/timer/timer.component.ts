import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],

})
export class TimerComponent implements OnInit {
  // timerPosition:number;

  @Output()
  numberOfTimer = new EventEmitter<number>();
  number = 0;
  timer:any;
  animation:any;

  constructor() {
    this.timer = `./assets/timer${this.number}.png`;
    this.number = 1;
      this.animation = setInterval ( () => {
      this.timer = `./assets/timer${this.number}.png`;
      if (this.number < 9)
      {this.number = this.number + 1;}
      else{
        this.numberOfTimer.emit(this.number);
        clearInterval(this.animation)
      }
    }, 1000);


   }

  ngOnInit() {
  }

}
