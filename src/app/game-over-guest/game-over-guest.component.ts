import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over-guest',
  templateUrl: './game-over-guest.component.html',
  styleUrls: ['./game-over-guest.component.scss']
})
export class GameOverGuestComponent implements OnInit {
  windowHeight = window.innerHeight;
  rivalId=[];
  rivalName=[];
  rivalTeam=[];
  rivalFlag=[];
  userName=[]
  userTeam=[];
  userFlag=[];
  userId = [];
  userEmail = [];
  userPassword = [];
  resultFirstHalfUser=[];
  resultSecondHalfUser=[];
  resultUser=[];
  resultFirstHalfRival=[];
  resultRival=[];
  constructor(private httpService: HttpService, private router: Router) {
    this.httpService.getGuest().subscribe(player => {
      if(player[0].rivalName == undefined){
      this.rivalId.push(player[0].rival);
      this.userTeam.push(player[0].team);
      this.userName.push(player[0].name);
      this.userEmail.push(player[0].email);
      this.userPassword.push(player[0].password);
      this.userFlag.push(`./assets/${player[0].team}.png`);
      this.userId.push(player[0].id);
      this.resultFirstHalfUser.push(player[0].scoredFirsthalf);
      this.resultSecondHalfUser.push(player[0].scoredSecondHalf);
      this.resultUser.push(player[0].scoredFirsthalf + player[0].scoredSecondHalf);
      this.httpService.getPlayerById(this.rivalId[0]).subscribe(rival=>{
        this.rivalName.push(rival[0].name);
        this.rivalTeam.push(rival[0].team);
        this.rivalFlag.push(`./assets/${this.rivalTeam}.png`);
        this.resultFirstHalfRival.push(rival[0].scoredFirsthalf);
        this.resultRival.push(rival[0].scoredFirsthalf + rival[0].scoredSecondHalf);
        const updateRival = ({
          id: this.rivalId[0],
          scoredFirsthalfRival:this.resultFirstHalfUser[0],
          scoredSecondHalfRival:this.resultSecondHalfUser[0],
          rivalName:this.userName[0],
          rivalTeam:this.userTeam[0]
        });
        const updateUser = ({
          id: this.userId[0],
          scoredFirsthalfRival:this.resultFirstHalfRival[0],
          scoredSecondHalfRival:this.resultRival[0],
          scoredFirsthalf:this.resultFirstHalfUser[0],
          scoredSecondHalf:this.resultSecondHalfUser[0],
          rivalName:this.rivalName[0],
          rivalTeam:this.rivalTeam[0]
        });
        this.httpService.updatePlayer(updateRival).subscribe(user => {
        })
        this.httpService.updateGuest(updateUser).subscribe(user => {
        })

      })
    }
    else{
      this.rivalId.push(player[0].rival);
      this.rivalName.push(player[0].rivalName);
      this.rivalTeam.push(player[0].rivalTeam);
      this.rivalFlag.push(`./assets/${player[0].rivalTeam}.png`);
      this.userName.push(player[0].name);
      this.userTeam.push(player[0].team);
      this.userFlag.push(`./assets/${player[0].team}.png`);
      this.userId.push(player[0].id);
      this.userEmail.push(player[0].email);
      this.userPassword.push(player[0].password);
      this.resultFirstHalfUser.push(player[0].scoredFirsthalf);
      this.resultUser.push(player[0].scoredFirsthalf + player[0].scoredSecondHalf);
      this.resultFirstHalfRival.push(player[0].scoredFirsthalfRival);
      this.resultRival.push(player[0].scoredFirsthalfRival + player[0].scoredSecondHalfRival);
    }
    })
  }

  ngOnInit() {
  }

  back(){
  this.httpService.deleteGuest(1).subscribe(guest=>{
    this.router.navigateByUrl('/gamechosse');
  })
  }


}
