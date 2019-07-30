import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Guest } from '../register/Guest';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  windowHeight = window.innerHeight;
  teams = ["Albania", "Algieria", "Anglia", "Angola", "Arabia Saudyjska", "Argentyna", "Australia", "Austria", "Azerbejdżan", "Bahrajn", "Belgia", "Benin", "Bialorus", "Boliwia", "Bośnia i Hercegowina", "Brzylia", "Bułgaria", "Chile", "Chiny", "Chorwacja", "Cypr", "Czechy", "Dania", "Egipt", "Ekwador", "Estonia", "Finlandia", "Francja", "Gabon", "Ghana", "Grecja", "Hiszpania", "Holandia", "Honduras", "Irlandia", "Islandia", "Izrael", "Jamajka", "Japonia", "Kamerun", "Kazahstan", "Kolumbia", "Kongo", "Kuba", "Liechtenstein", "Luxemburg", "Litwa", "Łotwa", "Macedonia Północna", "Mali", "Malta", "Maroko", "Meksyk", "Niemcy", "Nigeria", "Norwegia", "Panama", "Paragwaj", "Peru", "Polska", "Południowa Afryka", "Portugalia", "Rosja", "Rumunia", "Senegal", "Serbia", "Słowacja", "Słowenia", "Syria", "Szwajcaria", "Szwecja", "Togo", "Tunezja", "Turcja", "Ukraina", "Urugwaj", "USA", "Węgry", "Wenezuala", "Włochy","Wybrzeże Kości Słoniowej"];
  guestForm = new FormGroup({
    team: new FormControl(null,Validators.required)
  });
  guestTeam:any;
  registerGuest:any;
  warning:string;
  guest:any;
  opponent:any;
  noOponent ="";
  rival = [];
  rivalId =[];
  guestId = [];
  rivalName="";
  rivalTeam:any;
  rivalFlag:any;
  userName:any;
  userTeam:any;
  userFlag:any;
  time: any;
  rivalName2="";
  turn=false;
  isActive = false;
  constructor(private httpService:HttpService, private router: Router) {
    this.httpService.getGuest().subscribe(guest=>{
      this.guest = guest;
      if(this.guest.length == 0){
      }
      else if(this.guest[0].id == 1){
        if(this.guest[0].activeGame == true){
          this.isActive = true;
        if(this.guest[0].turn == true){
          this.turn = true;
        }
    }
    if(this.guest[0].activeGame == false){
      this.turn = false;
      this.guestId.push(this.guest[0].id);
      this.userName = this.guest[0].name;
      this.userTeam = this.guest[0].team;
      this.userFlag = `./assets/${this.guest[0].team}.png`;
    }

      }
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.guestTeam = this.guestForm.value.team;
    const registerGuest: Guest = ({
      name: "Guest",
      team: this.guestTeam,
      activeGame:false,
      questions:[],
      answers:[],
      firstHalf:[undefined],
      quart:1,
      scoredFirsthalf:0,
      scoredSecondHalf:0,
      half:1,
      endMatch:false
    });

        this.httpService.addGuest(registerGuest).subscribe(playerInfo=>{
          this.warning = "";
          this.guestForm.reset();
          this.httpService.getGuest().subscribe(guest=>{
          this.guest = guest;
          this.guestId.push(this.guest[0].id);
          this.userName = this.guest[0].name;
          this.userTeam = this.guest[0].team;
          this.userFlag = `./assets/${this.guest[0].team}.png`;
        })
        })
  }

  game() {
    this.rivalName2 = this.rival[0].name;
    if (this.rivalName2.length > 2) {
      this.time = 5;

      let timetoStart = setInterval(() => {

        if (this.time > 1) {
          this.time = this.time - 1
        }
        else {
          this.time = "start ...";
          const user = ({
            id: this.guestId[0],
            rival: this.rival[0].id,
            activeGame: true,
            turn: true,
            half: 1,
            goal: [],
            round: "attack"
          })
          const user2 = ({
            id: this.rival[0].id,
            rival: this.guestId[0],
            activeGame: true,
            turn: false,
            half: 1,
            goal: [],
            round: "deffend",
            guest:true
          })
          this.httpService.updateGuest(user).subscribe(user => {
          })
          this.httpService.updatePlayer(user2).subscribe(user2 => {
            this.router.navigateByUrl('/gameGuest');
          })
          clearInterval(timetoStart)
        }
      }, 1000);


    }
  }

  searchOpponent() {
    this.httpService.getPlayerByAvctivegame(false, false).subscribe(player => {
      this.opponent = player[Math.floor(Math.random() * player.length)];
      this.rival.push(this.opponent);
      if (this.rival[0] == undefined) {
        this.noOponent = "Wszyscy przeciwnicy grają aktualnie mecze, spróbuj poźniej";
      }
      else {
        this.rivalId.push(this.rival[0].id);
        this.rivalName = this.opponent.name;
        this.rivalTeam = this.opponent.team;
        this.rivalFlag = `./assets/${this.opponent.team}.png`;
        this.game();
      }
    })
  }



}
