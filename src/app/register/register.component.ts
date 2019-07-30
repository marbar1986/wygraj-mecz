import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Profile } from './Profile';
import { Router } from '@angular/router';
import { MessageUser } from './Message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  windowHeight = window.innerHeight;
  profileName:any;
  profileEmail:any;
  profilePassword:any;
  profileTeam:any;
  registerPlayersEmail:any;
  registerPlayersName:any;
  warning:string;
  teams = ["Albania", "Algieria", "Anglia", "Angola", "Arabia Saudyjska", "Argentyna", "Australia", "Austria", "Azerbejdżan", "Bahrajn", "Belgia", "Benin", "Bialorus", "Boliwia", "Bośnia i Hercegowina", "Brzylia", "Bułgaria", "Chile", "Chiny", "Chorwacja", "Cypr", "Czechy", "Dania", "Egipt", "Ekwador", "Estonia", "Finlandia", "Francja", "Gabon", "Ghana", "Grecja", "Hiszpania", "Holandia", "Honduras", "Irlandia", "Islandia", "Izrael", "Jamajka", "Japonia", "Kamerun", "Kazahstan", "Kolumbia", "Kongo", "Kuba", "Liechtenstein", "Luxemburg", "Litwa", "Łotwa", "Macedonia Północna", "Mali", "Malta", "Maroko", "Meksyk", "Niemcy", "Nigeria", "Norwegia", "Panama", "Paragwaj", "Peru", "Polska", "Południowa Afryka", "Portugalia", "Rosja", "Rumunia", "Senegal", "Serbia", "Słowacja", "Słowenia", "Syria", "Szwajcaria", "Szwecja", "Togo", "Tunezja", "Turcja", "Ukraina", "Urugwaj", "USA", "Wegry", "Wenezuala", "Włochy","Wybrzeże Kości Słoniowej"];
  profileForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    team: new FormControl(null,Validators.required)
  });
  constructor(private httpService:HttpService, private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit() {
    this.profileName = this.profileForm.value.name;
    this.profileEmail = this.profileForm.value.email;
    this.profilePassword = this.profileForm.value.password;
    this.profileTeam = this.profileForm.value.team;
    const registerPlayer: Profile = ({
      name: this.profileName,
      email: this.profileEmail,
      password: this.profilePassword,
      team: this.profileTeam,
      logged:false,
      win:0,
      draw:0,
      loss:0,
      activeGame:false,
      questions:[],
      answers:[],
      firstHalf:[undefined],
      quart:1,
      scoredFirsthalf:0,
      scoredSecondHalf:0,
      half:1,
      endMatch:false,
      guest:false
    });
    const messageUser: MessageUser = ({
      name: this.profileName,
      email: this.profileEmail,
      message:[],
      contacts:[],
      newContact:[],
      deleteContact:[]
    });
    this.httpService.getAllPlayers().subscribe(player=>{
      this.registerPlayersEmail = player;
      this.registerPlayersEmail = this.registerPlayersEmail.map(a => a.email);
      this.registerPlayersName = player;
      this.registerPlayersName = this.registerPlayersName.map(a => a.name);
      if(this.registerPlayersEmail.includes(this.profileEmail = this.profileForm.value.email)){
        this.warning = "Gracz o takim adresie email już istnieje!!!";
        this.profileForm.reset();
      }
      else if(this.registerPlayersName.includes(this.profileName = this.profileForm.value.name)){
        this.warning = "Menadżer o takiej nazwie już istnieje!!!";
        this.profileForm.reset();
      }
      else{
        this.httpService.addPlayer(registerPlayer).subscribe(playerInfo=>{
          this.warning = "";
          this.profileForm.reset();
          this.httpService.addMessageUser(messageUser).subscribe(playerInfo=>{
          })
          this.router.navigateByUrl('/logIn');
        })
      }

    })

  }

}
