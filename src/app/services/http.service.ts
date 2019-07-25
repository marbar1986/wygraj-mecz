import { Injectable } from '@angular/core';
import {Profile} from './../register/profile'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../register/Questions';
import { History } from '../register/History';
import { Guest } from '../register/Guest';
import { MessageUser } from '../register/Message';
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http:HttpClient) { }

  getAllPlayers():Observable<Profile>{
    return this.http.get<Profile>("http://localhost:3000/players");
  }

  addPlayer(player:Profile):Observable<Profile>{
    return this.http.post<Profile>("http://localhost:3000/players",player);
  }

  getPlayerByEmail(email:string){
    const parm = new HttpParams().set('email', email + "")
    return this.http.get<Array<Profile>>("http://localhost:3000/players",{params:parm});
  }
  getPlayerById(id:number){
    const parm = new HttpParams().set('id', id + "")
    return this.http.get<Array<Profile>>("http://localhost:3000/players",{params:parm});
  }

  updatePlayer(player:Profile){
    return this.http.patch("http://localhost:3000/players/" + player.id, player);
  }

  getLoggedPlayer(logged:boolean){
    const parm = new HttpParams().set('logged', logged + "")
    return this.http.get<Array<Profile>>("http://localhost:3000/players",{params:parm});
  }
  getPlayerByAvctivegame(logged:boolean,activeGame:boolean){
    const parm = new HttpParams().set('activeGame', activeGame + "")
    .set('logged', logged + "")
    return this.http.get<Array<Profile>>("http://localhost:3000/players",{params:parm});
  }

  //Guest
  addGuest(guest:Guest):Observable<Guest>{
    return this.http.post<Guest>("http://localhost:3000/guest",guest);
  }
  getGuest():Observable<Guest>{
    return this.http.get<Guest>("http://localhost:3000/guest");
  }
  updateGuest(player:Guest){
    return this.http.patch("http://localhost:3000/guest/" + player.id, player);
  }
  getGuestById(id:number){
    const parm = new HttpParams().set('id', id + "")
    return this.http.get<Array<Profile>>("http://localhost:3000/guest",{params:parm});
  }
  deleteGuest(id:number){
    return this.http.delete<Guest>("http://localhost:3000/guest/" + id);
  }
  //Questions
  getQuestionById(id:number){
    const parm = new HttpParams().set('id', id + "")
    return this.http.get<Array<Question>>("http://localhost:3000/questions",{params:parm});
  }

  //endMatch

  replacePlayer(player:Profile):Observable<Profile>{
    return this.http.put<Profile>("http://localhost:3000/players/"+ player.id,player);
  }

  //History
  postWinGame(post:History):Observable<History>{
    return this.http.post<History>("http://localhost:3000/historyWin",post);
  }
  postLossGame(post:History):Observable<History>{
    return this.http.post<History>("http://localhost:3000/historyLoss",post);
  }
  postDrawGame(post:History):Observable<History>{
    return this.http.post<History>("http://localhost:3000/historyDraw",post);
  }
  getHistoryWinByUserId(userId:number){
    const parm = new HttpParams().set('userId', userId + "")
    return this.http.get<Array<Question>>("http://localhost:3000/historyWin",{params:parm});
  }
  getHistoryLossByUserId(userId:number){
    const parm = new HttpParams().set('userId', userId + "")
    return this.http.get<Array<Question>>("http://localhost:3000/historyLoss",{params:parm});
  }
  getHistoryDrawByUserId(userId:number){
    const parm = new HttpParams().set('userId', userId + "")
    return this.http.get<Array<Question>>("http://localhost:3000/historyDraw",{params:parm});
  }

  //Chat
  addMessageUser(user:MessageUser):Observable<MessageUser>{
    return this.http.post<MessageUser>("http://localhost:3000/chat",user);
  }
  getAllPMessageUsers():Observable<MessageUser>{
    return this.http.get<MessageUser>("http://localhost:3000/chat");
  }
  updateMessageUser(messageUser:MessageUser){
    return this.http.patch("http://localhost:3000/chat/" + messageUser.id, messageUser);
  }
  getMessageUserByName(name:string){
    const parm = new HttpParams().set('name', name + "")
    return this.http.get<MessageUser>("http://localhost:3000/chat",{params:parm});
  }
}
