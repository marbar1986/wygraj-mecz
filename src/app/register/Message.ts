export interface MessageUser{
  id?:number;
  name?:string;
  email?:string;
  active?:boolean;
  message?:Array<object>;
  messageNew?:boolean;
  messageNewSender?:string;
  contacts?:Array<string>;
  newContact?:Array<string>;
}
