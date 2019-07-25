import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {path:"", loadChildren:"./home/home.module#HomeModule"},
  {path:"gamechosse", loadChildren:"./gamechosse/gamechosse.module#GamechosseModule"},
  {path:"register", loadChildren:"./register/register.module#RegisterModule"},
  {path:"logIn", loadChildren:"./log-in/log-in.module#LogInModule"},
  {path:"logged", loadChildren:"./logged-player/logged-player.module#LoggedModule"},
  {path:"game", loadChildren:"./game/game.module#GameModule"},
  {path:"gameOver", loadChildren:"./game-over/game-over.module#GameOverModule"},
  {path:"history", loadChildren:"./history/history.module#HistoryModule"},
  {path:"guest", loadChildren:"./guest/guest.module#GuestModule"},
  {path:"gameGuest", loadChildren:"./game-guest/game-guest.module#GameGuestModule"},
  {path:"gameVsGuest", loadChildren:"./game-vs-guest/game-vs-guest.module#GameVsGuestModule"},
  {path:"gameOverGuest", loadChildren:"./game-over-guest/game-over-guest.module#GameOverGuestModule"},
  {path:"gameOverVsGuest", loadChildren:"./game-over-guest/game-over-guest.module#GameOverGuestModule"},
  {path:"chatActive", loadChildren:"./chat-active/chat-active.module#ChatActiveModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
