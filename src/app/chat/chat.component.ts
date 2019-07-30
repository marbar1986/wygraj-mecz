import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat = `./assets/chat2.png`;
  newMessages:any;
  // userId = [];
  notRead:any;
  constructor(private httpService: HttpService, private router: Router) {
    this.httpService.getLoggedPlayer(true).subscribe(player => {
      this.httpService.getMessageUserByName(player[0].name).subscribe(user => {
        console.log(user[0].deleteContact.length)
        if(user[0].deleteContact.length > 0){
          this.newMessages = "!";
        }
        else if(user[0].deleteContact.length == 0)
        {
        this.newMessages = 0;
        console.log(user[0].message)
        this.notRead = user[0].message;
        this.notRead = this.notRead.map(a => a.read);
        this.notRead = this.notRead.filter(e => e !== true)
        console.log(this.notRead)
        this.newMessages = this.notRead.length;
      }
      })
    })
  }

  ngOnInit() {
  }

  chatActive(){
    console.log("ahsf");
    this.router.navigateByUrl('/chatActive');
  }

}
