import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-player',
  templateUrl: './logged-player.component.html',
  styleUrls: ['./logged-player.component.scss']
})
export class LoggedPlayerComponent implements OnInit {
  windowHeight = window.innerHeight;
  rivalName = "";
  rivalName2 = "--";
  rivalTeam: any;
  rivalFlag: any;
  userName: any;
  userFlag: any;
  userTeam: any;
  userWin: any;
  userDraw: any;
  userLoss: any;
  userId = [];
  opponent: any;
  rival = [];
  time: any;
  isTurn = [];
  activeGame = [];
  rivalId: any;
  noOponent = "";
  numberOfHalf: number;
  resultFirstHalfUser: number;
  resultUser: number;
  resultFirstHalfRival: number;
  resultRival: number;
  endMatch: boolean;
  guest = false;
  constructor(private httpService: HttpService, private router: Router) {
    this.httpService.getLoggedPlayer(true).subscribe(player => {
      this.httpService.getHistoryWinByUserId(player[0].id).subscribe(history => {

        const user = ({
          id: player[0].id,
          win: history.length,
          winHistory: history
        })

        this.httpService.updatePlayer(user).subscribe(user => {
          this.userWin = player[0].win;
        })

      })

      this.httpService.getHistoryLossByUserId(player[0].id).subscribe(history => {

        const user = ({
          id: player[0].id,
          loss: history.length,
          lossHistory: history
        })

        this.httpService.updatePlayer(user).subscribe(user => {
          this.userLoss = player[0].loss;
        })

      })

      this.httpService.getHistoryDrawByUserId(player[0].id).subscribe(history => {

        const user = ({
          id: player[0].id,
          draw: history.length,
          drawHistory: history
        })

        this.httpService.updatePlayer(user).subscribe(user => {
          this.userDraw = player[0].draw;
        })

      })

      this.endMatch = player[0].endMatch;

      if (this.endMatch == true) {
        this.router.navigateByUrl('/gameOver');
      }

      this.numberOfHalf = player[0].half;
      this.resultFirstHalfUser = player[0].scoredFirsthalf;
      this.resultUser = player[0].scoredFirsthalf + player[0].scoredSecondHalf;
      this.userName = player[0].name;
      this.userTeam = player[0].team;
      this.userFlag = `./assets/${player[0].team}.png`;
      this.userWin = player[0].win;
      this.userDraw = player[0].draw;
      this.userLoss = player[0].loss;
      this.userId.push(player[0].id);
      this.activeGame.push(player[0].activeGame);
      if(player[0].guest == true){
        this.guest = true;
        if(player[0].turn == true){
          this.isTurn.push(true);
        }
        if(player[0].turn == false){
          this.isTurn.push(false);
        }
      }

      else{
      if (this.activeGame[0] == true) {
        this.rivalId = player[0].rival;
        this.httpService.getPlayerById(this.rivalId).subscribe(rival => {

          this.resultFirstHalfRival = rival[0].scoredFirsthalf;
          this.resultRival = rival[0].scoredFirsthalf + rival[0].scoredSecondHalf;
          this.rivalFlag = `./assets/${rival[0].team}.png`;
          this.rivalName = rival[0].name;
          this.rivalName2 = rival[0].name;
          this.rivalTeam = rival[0].team;

        })
      }
      if (this.activeGame[0] == true && player[0].turn == true) {
        this.isTurn.push(player[0].turn);
      }
      if (this.activeGame[0] == true && player[0].turn == false) {
        this.isTurn.push(player[0].turn);
      }
}

    })

  }

  ngOnInit() {
  }

  searchOpponent() {
    this.httpService.getPlayerByAvctivegame(false, false).subscribe(player => {

      this.opponent = player[Math.floor(Math.random() * player.length)];
      this.rival.push(this.opponent);
      if (this.rival[0] == undefined) {
        this.noOponent = "Wszyscy przeciwnicy grają aktualnie mecze, spróbuj poźniej";
      }
      else {
        this.rivalName = this.opponent.name;
        this.rivalTeam = this.opponent.team;
        this.rivalFlag = `./assets/${this.opponent.team}.png`;
      }

    })

  }

  game() {
    this.rivalName2 = this.rival[0].name;
    if (this.rivalName2.length > 4) {
      this.time = 5;

      let timetoStart = setInterval(() => {

        if (this.time > 1) {
          this.time = this.time - 1
          console.log(this.time)
        }
        else {
          this.time = "start ...";
          const user = ({
            id: this.userId[0],
            rival: this.rival[0].id,
            activeGame: true,
            turn: true,
            half: 1,
            goal: [],
            round: "attack"
          })
          const user2 = ({
            id: this.rival[0].id,
            rival: this.userId[0],
            activeGame: true,
            turn: false,
            half: 1,
            goal: [],
            round: "deffend"
          })
          this.httpService.updatePlayer(user).subscribe(user => {
          })
          this.httpService.updatePlayer(user2).subscribe(user2 => {
            this.router.navigateByUrl('/game');
          })
          clearInterval(timetoStart)
        }
      }, 1000);


    }
  }

  gameContinue() {
    this.router.navigateByUrl('/game');
  }

  gameContinueGuest() {
    this.router.navigateByUrl('/gameVsGuest');
  }

  historyWin() {
    const user = ({
      id: this.userId[0],
      history: "win"
    })
    this.httpService.updatePlayer(user).subscribe(user => {
      this.router.navigateByUrl('/history');
    })
  }

  historyLoss() {
    const user = ({
      id: this.userId[0],
      history: "loss"
    })
    this.httpService.updatePlayer(user).subscribe(user => {
      this.router.navigateByUrl('/history');
    })
  }

  historyDraw() {
    const user = ({
      id: this.userId[0],
      history: "draw"
    })
    this.httpService.updatePlayer(user).subscribe(user => {
      this.router.navigateByUrl('/history');
    })
  }

  logOut() {
    const user = ({
      id: this.userId[0],
      logged: false
    })
    this.httpService.updatePlayer(user).subscribe(user => {
    })

  }

}
