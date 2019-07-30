import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  windowHeight = window.innerHeight;
  logInEmail: any;
  logInPassword: any;
  emailCorrect = "";
  passwordCorrect = "";
  logInForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });
  constructor(private httpService: HttpService,private router:Router) {
  }

  onSubmit() {

    this.logInEmail = this.logInForm.value.email;
    this.logInPassword = this.logInForm.value.password;

    this.httpService.getPlayerByEmail(this.logInEmail).subscribe(player => {
      
      if (player.length == 1 && player[0].password == this.logInPassword) {
          const user = ({
            id:player[0].id,
            logged:true
          })
          this.httpService.updatePlayer(user).subscribe(user =>{
            this.router.navigateByUrl('/logged');
          })

      }
      else if (player.length == 1 && player[0].password != this.logInPassword) {
        this.passwordCorrect = "";
        this.passwordCorrect = "haslo jest nieprawidowe";
        this.logInForm.controls['password'].reset();
      }
      else if (player.length != 1) {
        this.emailCorrect = "";
        this.emailCorrect = "nie ma takiego użytkownika";
        this.logInForm.reset();
      }
    })
  }


  ngOnInit() {
  }

}
