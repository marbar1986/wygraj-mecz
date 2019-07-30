import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  windowHeight = window.innerHeight;
  history:string;
  allHistory:any;
  headerHistory:string;
  constructor(private httpService: HttpService, private router: Router) {

    this.httpService.getLoggedPlayer(true).subscribe(player => {
      this.history=player[0].history;
      if(this.history == "win"){
      this.headerHistory = "Histroia zwycięstw";
      this.allHistory = player[0].winHistory;
      }
      if(this.history == "loss"){
        this.headerHistory = "Histroia porażek";
      this.allHistory = player[0].lossHistory;
      }
      if(this.history == "draw"){
        this.headerHistory = "Histroia remisów";
      this.allHistory = player[0].drawHistory;
      }
    })
   }

  ngOnInit() {
  }

}
