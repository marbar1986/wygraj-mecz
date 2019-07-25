import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  windowHeight = window.innerHeight;
  rivalId=[];
  rivalName:any;
  rivalTeam:any;
  rivalFlag:any;
  userName:any;
  userTeam:any;
  userFlag:any;
  userId = [];
  RoundActionNumber = [];
  question="";
  questionId:number;
  numberOfQuestions = [];
  answer1:string;
  answer2:string;
  answer3:string;
  answer4:string;
  questionsAll = [];
  questionsAllId = [];
  actuallyQuestionId = [];
  answersAll = [];
  answersAllCorrect = [];
  answersAllCorrectDeffend = [];
  correctAnswer = [];
  answersNotCompleted=false;
  updateNumberOfAction = [];
  numberOfHalf=[];
  resultFirstHalfUser:number;
  resultUser:number;
  resultFirstHalfRival:number;
  resultRival:number;
  endTourn = false;
  rounds = [];
  goals = [];
  quart=[];
  timer:boolean;
  constructor(private httpService: HttpService, private router: Router) {
    this.httpService.getLoggedPlayer(true).subscribe(player => {
      this.quart.push(player[0].quart);
      if(this.quart[0] <= 2){
        this.numberOfHalf.push(player[0].half);
        console.log(this.numberOfHalf[0])
      }
      if(this.quart[0] > 2){
        const user = ({
          id: player[0].id,
          half:2
        });
        this.httpService.updatePlayer(user).subscribe(user => {
          console.log(user);
        })
        this.numberOfHalf.push(player[0].half);
        console.log(this.numberOfHalf[0])
      }
      this.rounds.push(player[0].round);
      this.resultFirstHalfUser = player[0].scoredFirsthalf;
      this.resultUser = player[0].scoredFirsthalf + player[0].scoredSecondHalf;
      if(player[0].firstHalf[0] == 0){
        this.endTourn = true;
        console.log("jest")
      }
      this.rivalId.push(player[0].rival);
      this.userName = player[0].name;
      this.userFlag = `./assets/${player[0].team}.png`;
      this.userId.push(player[0].id);
      this.RoundActionNumber.push(player[0].firstHalf[0]);
      this.updateNumberOfAction.push(player[0].numberOfAction);
      this.questionsAllId = player[0].questions;
      this.answersAllCorrect = player[0].answers;

      console.log(this.questionsAllId)
      console.log(this.answersAllCorrect)
      this.httpService.getPlayerById(this.rivalId[0]).subscribe(rival=>{
        this.resultFirstHalfRival = rival[0].scoredFirsthalf;
        this.resultRival = rival[0].scoredFirsthalf + rival[0].scoredSecondHalf;
        if(this.rounds[0] == "deffend"){
          console.log("jest defend");
          console.log(rival[0].questions)
          this.questionsAllId = rival[0].questions;
          this.answersAllCorrect = rival[0].answers;
          for(let i=0; i<=this.answersAllCorrect.length;i++){
            if(this.answersAllCorrect[i] == false){
              this.questionsAllId.splice(i, 1);
              this.answersAllCorrect.splice(i, 1);
              i = i - 1;
            }
          }
          this.RoundActionNumber.push(this.questionsAllId);
          this.RoundActionNumber = [this.questionsAllId.length];
          console.log(this.questionsAllId);
          console.log(this.answersAllCorrect);
          const user = ({
            id:this.rivalId[0],
            questions:this.questionsAllId,
            answers:[]
          })
          this.httpService.updatePlayer(user).subscribe(user =>{
            let newUser = [];
            newUser.push(user);
            if(newUser[0].questions.length == 0){
                console.log(user)
                this.endTourn = true;
                this.question="";
            }
          })
        }
        this.rivalName = rival[0].name;
        this.rivalTeam= rival[0].team;
        this.rivalFlag= `./assets/${this.rivalTeam}.png`;
      })

      if(this.rounds[0] == "attack"){

      if(this.questionsAllId.length != this.answersAllCorrect.length){
      this.actuallyQuestionId.push(player[0].questions.pop());
      console.log(this.actuallyQuestionId)
      }
    }
    })
   }

   shuffle(a) {
       for (let i = a.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [a[i], a[j]] = [a[j], a[i]];
       }
       return a;
   }

  ngOnInit() {
  }




  questions(){
    this.timer = true;
    if(this.actuallyQuestionId.length > 0){
      this.httpService.getQuestionById(this.actuallyQuestionId[0]).subscribe(question=>{
        console.log(question)
        this.question = question[0].question;
        this.correctAnswer.push(question[0].correctAnswer);
        console.log(this.correctAnswer[0])
        this.questionsAll.push(question[0]);
        this.questionsAllId.push(question[0].id);
        this.answersAll.push(this.questionsAll[0].answers[0].a);
        this.answersAll.push(this.questionsAll[0].answers[0].b);
        this.answersAll.push(this.questionsAll[0].answers[0].c);
        this.answersAll.push(this.questionsAll[0].answers[0].d);
        this.shuffle(this.answersAll);
        this.answer1 = this.answersAll[0];
        this.answer2 = this.answersAll[1];
        this.answer3 = this.answersAll[2];
        this.answer4= this.answersAll[3];
        console.log(this.answersAll)
        const user = ({
          id:this.userId[0],
          questions:this.questionsAllId,
          answers:this.answersAllCorrect
        })
        this.httpService.updatePlayer(user).subscribe(user =>{
          console.log(user)

        })
        this.questionsAll = [];
        this.answersAll = [];
      })
    }
    else{
      if(this.rounds[0] == "attack"){

    this.httpService.getQuestionById(Math.floor((Math.random() * 104) + 1)).subscribe(question=>{
      console.log(question)
      this.question = question[0].question;
      this.correctAnswer.push(question[0].correctAnswer);
      console.log(this.correctAnswer[0])
      this.questionsAll.push(question[0]);
      this.questionsAllId.push(question[0].id);
      this.answersAll.push(this.questionsAll[0].answers[0].a);
      this.answersAll.push(this.questionsAll[0].answers[0].b);
      this.answersAll.push(this.questionsAll[0].answers[0].c);
      this.answersAll.push(this.questionsAll[0].answers[0].d);
      this.shuffle(this.answersAll);
      this.answer1 = this.answersAll[0];
      this.answer2 = this.answersAll[1];
      this.answer3 = this.answersAll[2];
      this.answer4= this.answersAll[3];
      console.log(this.answersAll)
      const user = ({
        id:this.userId[0],
        questions:this.questionsAllId,
        answers:this.answersAllCorrect
      })
      this.httpService.updatePlayer(user).subscribe(user =>{
        console.log(user)
      })
      this.questionsAll = [];
      this.answersAll = [];
    })
  }
  if(this.rounds[0] == "deffend"){
      this.correctAnswer= [];
    this.httpService.getQuestionById(this.questionsAllId[0]).subscribe(question=>{
      this.question = question[0].question;
      this.correctAnswer.push(question[0].correctAnswer);
      console.log(this.correctAnswer[0])
      this.questionsAll.push(question[0]);
      this.questionsAllId.push(question[0].id);
      this.answersAll.push(this.questionsAll[0].answers[0].a);
      this.answersAll.push(this.questionsAll[0].answers[0].b);
      this.answersAll.push(this.questionsAll[0].answers[0].c);
      this.answersAll.push(this.questionsAll[0].answers[0].d);
      this.shuffle(this.answersAll);
      this.answer1 = this.answersAll[0];
      this.answer2 = this.answersAll[1];
      this.answer3 = this.answersAll[2];
      this.answer4= this.answersAll[3];
      console.log(this.answersAll);
      this.questionsAll = [];
      this.answersAll = [];
})
  }

  }

}
  getNumberOfTimer(number:number):void{
    if(this.timer == true){
    if(this.rounds[0] == "attack"){
      this.answersAllCorrect.push(false);
      this.RoundActionNumber[0] =  this.RoundActionNumber[0] - 1;
      const user = ({
        id:this.userId[0],
        questions:this.questionsAllId,
        answers:this.answersAllCorrect,
        numberOfAction: this.updateNumberOfAction[0] + 1,
        firstHalf: [this.RoundActionNumber[0]]
      })
      this.httpService.updatePlayer(user).subscribe(user =>{

        console.log(user)
        if(this.RoundActionNumber[0] == 0){
          this.endTourn = true;
          console.log("jest")
        }
      })
      this.question="";
      this.correctAnswer= [];
    }
    if(this.rounds[0] == "deffend"){
      this.goals.push(1);

      this.httpService.getPlayerById(this.rivalId[0]).subscribe(rival=>{
        this.questionsAllId = [];
        this.questionsAllId = rival[0].questions;
        console.log(this.questionsAll)
        this.questionsAllId.shift();
        console.log(this.questionsAllId);
      const user = ({
        id:this.rivalId[0],
        goal:this.goals,
        questions:this.questionsAllId

      })
      this.RoundActionNumber = [this.questionsAllId.length];
      this.httpService.updatePlayer(user).subscribe(user =>{

        console.log(user)
        if(this.questionsAllId.length == 0){
          this.endTourn = true;
          console.log("jest")
        }
      })
    })
      this.question="";
      this.correctAnswer= [];
    }
  }
  if(this.timer == false){
    console.log("nic sie nie wydarzy")
  }
  }

  answer(e){
    // zatrzyma timer
    this.timer = false;
    console.log(e.target)
    if(this.rounds[0] == "attack"){
    if(e.target.innerHTML == this.correctAnswer[0]){
      console.log("zmieniam");
      e.target.style.background = "green";
      setTimeout(()=>{
      this.answersAllCorrect.push(true);
      this.RoundActionNumber[0] =  this.RoundActionNumber[0] - 1;
      const user = ({
        id:this.userId[0],
        questions:this.questionsAllId,
        answers:this.answersAllCorrect,
        numberOfAction: this.updateNumberOfAction[0] + 1,
        firstHalf: [this.RoundActionNumber[0]]
      })

      this.httpService.updatePlayer(user).subscribe(user =>{
        console.log(user)
        if(this.RoundActionNumber[0] == 0){
          this.endTourn = true;
          console.log("jest")
        }
      })
      this.question="";
      this.correctAnswer= [];
    },1000)
  }if(e.target.innerHTML != this.correctAnswer[0]){
    e.target.style.background = "red";

      setTimeout(()=>{

      this.answersAllCorrect.push(false);
      this.RoundActionNumber[0] =  this.RoundActionNumber[0] - 1;
      const user = ({
        id:this.userId[0],
        questions:this.questionsAllId,
        answers:this.answersAllCorrect,
        numberOfAction: this.updateNumberOfAction[0] + 1,
        firstHalf: [this.RoundActionNumber[0]]
      })
      this.httpService.updatePlayer(user).subscribe(user =>{

        console.log(user)
        if(this.RoundActionNumber[0] == 0){
          this.endTourn = true;
          console.log("jest")
        }
      })
      this.question="";
      this.correctAnswer= [];
    },1000)

    }

  }
  if(this.rounds[0] == "deffend"){


    if(e.target.innerHTML == this.correctAnswer[0]){
      e.target.style.background = "green";

      setTimeout(()=>{

      this.httpService.getPlayerById(this.rivalId[0]).subscribe(rival=>{
        this.questionsAllId = rival[0].questions;
        this.answersAllCorrect = rival[0].answers;
        this.questionsAllId.shift();
        this.answersAllCorrect.shift();
        console.log(this.questionsAllId);
        console.log(this.answersAllCorrect);

      const user = ({
        id:this.rivalId[0],
        questions:this.questionsAllId,
        answers:this.answersAllCorrectDeffend

      })
      this.RoundActionNumber = [this.questionsAllId.length];
      this.httpService.updatePlayer(user).subscribe(user =>{

        console.log(user)
        if(this.questionsAllId.length == 0){
          this.endTourn = true;
          console.log("jest")
        }
      })
    })
      this.question="";
    },1000)

    }
    if(e.target.innerHTML != this.correctAnswer[0]){
      e.target.style.background = "red";

      setTimeout(()=>{

      this.goals.push(1);

      this.httpService.getPlayerById(this.rivalId[0]).subscribe(rival=>{
        this.questionsAllId = [];
        this.questionsAllId = rival[0].questions;
        console.log(this.questionsAll)
        this.questionsAllId.shift();
        console.log(this.questionsAllId);
      const user = ({
        id:this.rivalId[0],
        goal:this.goals,
        questions:this.questionsAllId

      })
      this.RoundActionNumber = [this.questionsAllId.length];
      this.httpService.updatePlayer(user).subscribe(user =>{

        console.log(user)
        if(this.questionsAllId.length == 0){
          this.endTourn = true;
          console.log("jest")
        }
      })
    })
      this.question="";
      this.correctAnswer= [];
    },1000)
}

}
  }

  numberOfAction(){
this.RoundActionNumber = [];
this.RoundActionNumber.push(Math.floor((Math.random() * 4) + 1));
console.log(this.RoundActionNumber[0])
const user = ({
  id:this.userId[0],
  firstHalf:[this.RoundActionNumber[0]],
  numberOfAction:1,
})
this.httpService.updatePlayer(user).subscribe(user =>{
  console.log(user)
})

  }

  endOfTurn(){
    if(this.rounds[0] == "attack"){
// if(this.quart[0] == 1){
    const user = ({
      id: this.userId[0],
      turn:false,
      round:"deffend",
      numberOfAction:0,
      // quart:2
    });
    const rival = ({
      id: this.rivalId[0],
      turn:true,
      round:"deffend",
      numberOfAction:999,
      firstHalf:[999],
      // quart:1
    });
    this.httpService.updatePlayer(user).subscribe(user => {
      console.log(user);
    })
    this.httpService.updatePlayer(rival).subscribe(rival => {
      console.log(rival);
      this.router.navigateByUrl('/logged');
    })
  }
  if(this.rounds[0] == "deffend"){
    console.log(this.quart[0])
    if(this.numberOfHalf[0] == 1 && this.quart[0] == 1){
      this.httpService.getPlayerById(this.rivalId[0]).subscribe(updateRival=>{
    const user = ({
      id: this.userId[0],
      turn:true,
      round:"attack",
      numberOfAction:1,
      firstHalf:[undefined],
      quart:2
    });
    const rival = ({
      id: this.rivalId[0],
      turn:false,
      round:"deffend",
      numberOfAction:999,
      firstHalf:[999],
      scoredFirsthalf:updateRival[0].goal.length,
      goal:[],
      quart:2
    });
    this.httpService.updatePlayer(user).subscribe(user => {
      console.log(user);
    })
    this.httpService.updatePlayer(rival).subscribe(rival => {
      console.log(rival);
      this.router.navigateByUrl('/logged');
    })
  })
  }
    if(this.numberOfHalf[0] == 1 && this.quart[0] == 2){
      this.httpService.getPlayerById(this.rivalId[0]).subscribe(updateRival=>{
    const user = ({
      id: this.userId[0],
      turn:true,
      round:"attack",
      numberOfAction:1,
      firstHalf:[undefined],
      quart:3,
      half:2
    });
    const rival = ({
      id: this.rivalId[0],
      turn:false,
      round:"deffend",
      numberOfAction:999,
      firstHalf:[999],
      scoredFirsthalf:updateRival[0].goal.length,
      goal:[],
      quart:3,
      half:2
    });
    this.httpService.updatePlayer(user).subscribe(user => {
      console.log(user);
    })
    this.httpService.updatePlayer(rival).subscribe(rival => {
      console.log(rival);
      this.router.navigateByUrl('/logged');
    })
  })
  }
    if(this.numberOfHalf[0] == 2 && this.quart[0] == 3){
      this.httpService.getPlayerById(this.rivalId[0]).subscribe(updateRival=>{
    const user = ({
      id: this.userId[0],
      turn:true,
      round:"attack",
      numberOfAction:1,
      firstHalf:[undefined],
      quart:4,
      half:2
    });
    const rival = ({
      id: this.rivalId[0],
      turn:false,
      round:"deffend",
      numberOfAction:999,
      firstHalf:[999],
      scoredSecondHalf:updateRival[0].goal.length,
      goal:[],
      quart:4,
      half:2
    });
    this.httpService.updatePlayer(user).subscribe(user => {
      console.log(user);
    })
    this.httpService.updatePlayer(rival).subscribe(rival => {
      console.log(rival);
      this.router.navigateByUrl('/logged');
    })
  })
  }
    if(this.numberOfHalf[0] == 2 && this.quart[0] == 4){
      this.httpService.getPlayerById(this.rivalId[0]).subscribe(updateRival=>{
    const user = ({
      id: this.userId[0],
      turn:true,
      round:"attack",
      numberOfAction:1,
      firstHalf:[undefined],
      quart:4,
      endMatch:true
    });
    const rival = ({
      id: this.rivalId[0],
      turn:false,
      round:"deffend",
      numberOfAction:999,
      firstHalf:[999],
      scoredSecondHalf:updateRival[0].goal.length,
      goal:[],
      quart:4,
      endMatch:true
    });

    this.httpService.updatePlayer(user).subscribe(user => {
      console.log(user);
    })
    this.httpService.updatePlayer(rival).subscribe(rival => {
      console.log(rival);
      this.router.navigateByUrl('/gameOver');
    })
  })

  }

}
}
  logOut() {
    const user = ({
      id: this.userId[0],
      logged: false
    })
    this.httpService.updatePlayer(user).subscribe(user => {
      this.router.navigateByUrl('/gamechosse');

    })
  }

}
