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
  notRead:any;
  constructor(private httpService: HttpService, private router: Router) {
    this.httpService.getLoggedPlayer(true).subscribe(player => {
      this.httpService.getMessageUserByName(player[0].name).subscribe(user => {
        if(user[0].deleteContact.length > 0 || user[0].deleteExistingContact.length > 0){
          this.newMessages = "!";
        }
        else if(user[0].deleteContact.length == 0 && user[0].deleteExistingContact.length == 0)
        {
        this.newMessages = 0;
        this.notRead = user[0].message;
        this.notRead = this.notRead.map(a => a.read);
        this.notRead = this.notRead.filter(e => e !== true)
        this.newMessages = this.notRead.length;
      }
      })
    })
  }

  ngOnInit() {
  }

  chatActive(){
    this.router.navigateByUrl('/chatActive');
  }

}
