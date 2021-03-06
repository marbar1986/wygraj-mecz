import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddContactComponent } from '../add-contact';
import { DeleteContactComponent } from '../delete-contact';
import { DeleteExistingContactComponent } from '../delete-existing-contact';
import { ConfirmDeleteExistingContactComponent } from '../confirm-delete-existing-contact';
@Component({
  selector: 'app-chat-active',
  templateUrl: './chat-active.component.html',
  styleUrls: ['./chat-active.component.scss']
})
export class ChatActiveComponent implements OnInit{


  windowHeight = window.innerHeight;
  unreadMessages = [];
  userId = [];
  userName = [];
  messageMessage = [];
  messageName = [];
  myContacts = [];
  addressed = "";
  historyChat = [];
  allMessageUsers=[];
  MessageUsersName: any;
  MessageContact = [];
  UserContactMessages = [];
  newContact = [];
  newContactMessages=[];
  newContactMessagesLength:number;
  warning: string;
  addContact=false;
  public time: Date = new Date();
  modalRef: BsModalRef;
  newTime: any;
  deleteContact = [];
  deleteExistingContact = [];
  messageForm = new FormGroup({
    message: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  messageForm2 = new FormGroup({
    message: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  constructor(private _location: Location, private httpService: HttpService, private router: Router,private modalService: BsModalService) {

    this.newTime = this.time;
    this.httpService.getLoggedPlayer(true).subscribe(player => {
      this.userId.push(player[0].id);
      this.userName.push(player[0].name);
      this.httpService.getMessageUserByName(player[0].name).subscribe(user => {
        this.deleteExistingContact = user[0].deleteExistingContact;
        this.deleteContact = user[0].deleteContact;
        this.myContacts = user[0].contacts;
        this.newContactMessages = user[0].message;
        this.newContact = user[0].newContact;
        this.myContacts.forEach((el)=>{
          this.newContact = this.newContact.filter(o => {
              return o !== el;
            });
        })
        this.myContacts.forEach((el)=>{
          this.newContactMessages = this.newContactMessages.filter(o => {
              return o.name !== el;
            });
        })
        this.newContactMessagesLength = this.newContactMessages.length;
        if(this.newContact.length > 0){
           this.addContact = true;
        }

        const updateMessageUser = {
          id: this.userId[0],
          newContact:this.newContact
        };
        this.httpService.updateMessageUser(updateMessageUser).subscribe(e=>{
        })
        for(let i=0; i<this.myContacts.length; i++){
          let message = user[0].message;
          message = message.filter(o => {
              return o.name == this.myContacts[i];
            });
          message = message.filter(o => {
              return o.read == false;
            });
            this.unreadMessages.push(message.length)
        }
      })
    })
    this.httpService.getAllPMessageUsers().subscribe(users => {
      this.MessageUsersName = users;
      this.MessageUsersName = this.MessageUsersName.map(a => a.name);
    })
  }


  refreshCompontentChat(){
    this.newTime = this.time;
    this.httpService.getLoggedPlayer(true).subscribe(player => {
      this.userId.push(player[0].id);
      this.userName.push(player[0].name);
      this.httpService.getMessageUserByName(player[0].name).subscribe(user => {
        this.deleteExistingContact = user[0].deleteExistingContact;
        this.deleteContact = user[0].deleteContact;
        this.myContacts = user[0].contacts;
        this.newContactMessages = user[0].message;
        this.newContact = user[0].newContact;
        this.myContacts.forEach((el)=>{
          this.newContact = this.newContact.filter(o => {
              return o !== el;
            });
        })
        this.myContacts.forEach((el)=>{
          this.newContactMessages = this.newContactMessages.filter(o => {
              return o.name !== el;
            });
        })
        this.newContactMessagesLength = this.newContactMessages.length;
        if(this.newContact.length > 0){
           this.addContact = true;
        }
        const updateMessageUser = {
          id: this.userId[0],
          newContact:this.newContact
        };
        this.httpService.updateMessageUser(updateMessageUser).subscribe(e=>{
          this.httpService.getMessageUserByName(this.userName[0]).subscribe(user=>{
            this.unreadMessages = [];
            this.myContacts = user[0].contacts;
            for(let i=0; i<this.myContacts.length; i++){
              let message = user[0].message;
              message = message.filter(o => {
                return o.name == this.myContacts[i];
              });
              message = message.filter(o => {
                return o.read == false;
              });
              this.unreadMessages.push(message.length);
            }
            this.newContact = user[0].newContact;
            if(this.newContact.length < 1){
              this.addContact = false;
            }

          })
        })

      })
    })
    this.httpService.getAllPMessageUsers().subscribe(users => {
      this.MessageUsersName = users;
      this.MessageUsersName = this.MessageUsersName.map(a => a.name);
    })
  }


  ngOnInit() {
  }

  backToAddPlayer(){
    this.addressed = "";
  }

  send(e) {
    this.messageName = [];
    this.messageMessage = [];
    this.messageName.push(this.messageForm.value.name);
    this.messageMessage.push(this.messageForm.value.message);
    if (this.myContacts.includes(this.messageName[0])) {
      this.warning = "masz już tego uzytkownika w kontaktach wejdźw odpowiedni kontakt";
      this.messageForm.reset();
    }
    else {
      if (this.MessageUsersName.includes(this.messageName[0])) {
        this.httpService.getMessageUserByName(this.messageName[0]).subscribe(sender => {
          this.httpService.getMessageUserByName(this.userName[0]).subscribe(user => {
            this.newContact = sender[0].newContact;
            this.newContact.push(this.userName[0]);
            this.MessageContact = sender[0].message;
            const newMessage = {
              id: this.userId[0],
              name: this.userName[0],
              text: this.messageMessage[0],
              data: this.time,
              read: false
            };
            this.MessageContact.push(newMessage);
            this.UserContactMessages = user[0].contacts;
            this.UserContactMessages.push(this.messageName[0]);
            const messageUser = ({
              id: sender[0].id,
              newContact: this.newContact,
              message: this.MessageContact
            })
            const messageUser2 = ({
              id: user[0].id,
              contacts: this.UserContactMessages,
            })
            this.httpService.updateMessageUser(messageUser).subscribe(data => {
            })
            this.httpService.updateMessageUser(messageUser2).subscribe(data => {
              this.httpService.getMessageUserByName(this.userName[0]).subscribe(user => {
                this.myContacts = user[0].contacts;
                  this.myContacts = user[0].contacts;
                  for(let i=0; i<this.myContacts.length; i++){
                    let message = user[0].message;
                    message = message.filter(o => {
                        return o.name == this.myContacts[i];
                      });
                    message = message.filter(o => {
                        return o.read == false;
                      });
                      this.unreadMessages.push(message.length)
                  }
              })
            })
          })
        })
        this.warning = "wiadomośc zostaa wyslana";
        this.messageForm.reset();
      } else {
        this.warning = "nie ma takiego użytkjownika";
        this.messageForm.reset();
      }

    }

  }

  sendTo(e) {
    this.messageMessage = [];
    this.messageMessage.push(this.messageForm2.value.message);
        this.httpService.getMessageUserByName(this.addressed.slice(0, -1)).subscribe(sender => {
          this.httpService.getMessageUserByName(this.userName[0]).subscribe(user => {
            this.MessageContact = sender[0].message;
            const newMessage = {
              id: this.userId[0],
              name: this.userName[0],
              text: this.messageMessage[0],
              data: this.time,
              read: false
            };
            this.MessageContact.push(newMessage);
            this.UserContactMessages = user[0].contacts;
            this.UserContactMessages.push(this.addressed.slice(0, -1));
            const messageUser = ({
              id: sender[0].id,
              message: this.MessageContact
            })

            this.httpService.updateMessageUser(messageUser).subscribe(data => {
              this.historyChat = []
              this.httpService.getMessageUserByName(this.userName[0]).subscribe(user => {
                this.httpService.getMessageUserByName(this.addressed.slice(0, -1)).subscribe(user2 => {
                  this.historyChat.push(...user[0].message);
                  this.historyChat.push(...user2[0].message);
                  this.messageForm2.reset();
                  let historyChat1 = this.historyChat.filter(o => {
                      return o.name == this.addressed.slice(0, -1);
                    });
                  let historyChat2 = this.historyChat.filter(o => {
                      return o.name == this.userName[0];
                    });
                    this.historyChat = historyChat1;
                    this.historyChat.push(...historyChat2);
                    this.historyChat.sort((d1, d2) => new Date(d1.data).getTime() - new Date(d2.data).getTime());
                })
              })
            })

          })
        })

  }
  openModal2(){
      this.modalRef = this.modalService.show(DeleteContactComponent,{
        backdrop  : 'static',
     keyboard  : false,
        initialState:{
          title: this.deleteContact[0],
          data:{}
        }
      });
      this.modalRef.content.deleteNewContact.subscribe((value) => {
        this.httpService.getMessageUserByName(this.userName[0]).subscribe(user=>{
          let newDeletecontact = user[0].deleteContact;
            this.myContacts = this.myContacts.filter(o => {
                return o !== newDeletecontact[0];
              });
              newDeletecontact.shift();
              const messageUser2 = ({
                id: this.userId[0],
                deleteContact:newDeletecontact,
                contacts:this.myContacts
              })
              this.httpService.updateMessageUser(messageUser2).subscribe(user2=>{
                this.deleteContact= [];
                this.refreshCompontentChat();
              })
        })
      })
  }
  openModal4(){
      this.modalRef = this.modalService.show(ConfirmDeleteExistingContactComponent,{
        backdrop  : 'static',
     keyboard  : false,
        initialState:{
          title: this.deleteExistingContact[0],
          data:{}
        }
      });
      this.modalRef.content.deleteNewContact.subscribe((value) => {
        this.httpService.getMessageUserByName(this.userName[0]).subscribe(user=>{
          let newDeletecontact = user[0].deleteExistingContact;
            this.myContacts = this.myContacts.filter(o => {
                return o !== newDeletecontact[0];
              });
              newDeletecontact.shift();
              console.log(newDeletecontact)
              const messageUser2 = ({
                id: this.userId[0],
                deleteExistingContact:newDeletecontact,
                contacts:this.myContacts
              })
              this.httpService.updateMessageUser(messageUser2).subscribe(user2=>{
                this.deleteExistingContact= [];
                this.refreshCompontentChat();
              })
        })
      })
  }
  openModal(){
    this.modalRef = this.modalService.show(AddContactComponent,{
      backdrop  : 'static',
   keyboard  : false,
      initialState:{
        title: this.newContact[0],
        data:{}
      }
    });
    this.modalRef.content.addNewConntact.subscribe((value) => {
    		if(value == true){
          this.httpService.getMessageUserByName(this.userName[0]).subscribe(user =>{
            this.UserContactMessages = user[0].contacts;
            this.UserContactMessages.push(this.newContact[0]);
            const messageUser = ({
              id: user[0].id,
              contacts: this.UserContactMessages,
            })
            this.httpService.updateMessageUser(messageUser).subscribe(user => {
                this.deleteContact= [];
                this.refreshCompontentChat();
              })
          })

        } else if( value ==false){
          this.httpService.getMessageUserByName(this.userName[0]).subscribe(user =>{

            let userMessage = user[0].message;
            let deleteUserMessage = this.newContact[0];
            this.httpService.getMessageUserByName(this.newContact[0]).subscribe(user2 =>{
              userMessage = userMessage.filter(o => {
                  return o.name !== deleteUserMessage;
                });
                this.deleteContact.push(this.userName[0]);
                this.newContact.shift();
            const messageUser = ({
              id: user[0].id,
              message: userMessage,
              newContact:this.newContact
            })
            const messageUser2 = ({
              id: user2[0].id,
              deleteContact:this.deleteContact
            })
            this.httpService.updateMessageUser(messageUser).subscribe(user => {
              })
            this.httpService.updateMessageUser(messageUser2).subscribe(user => {
              this.deleteContact= [];
              this.refreshCompontentChat();
              })
          })
        })
        }
    		});
  }

  contactSendMessage(e) {
    this.historyChat = [];
    this.httpService.getMessageUserByName(this.userName[0]).subscribe(user => {
      this.httpService.getMessageUserByName(e.target.innerHTML.slice(0, -1)).subscribe(user2 => {
        let message = user[0].message;
        message.forEach((el)=>{if(el.name==e.target.innerHTML.slice(0, -1)){
          el.read = true;
        }})
        const messageUser = ({
          id: this.userId[0],
          message: message
        })
        this.httpService.updateMessageUser(messageUser).subscribe(update=>{
          this.httpService.getMessageUserByName(this.userName[0]).subscribe(user => {
            this.unreadMessages = [];
            this.myContacts = user[0].contacts;
            for(let i=0; i<this.myContacts.length; i++){
              let message = user[0].message;
              message = message.filter(o => {
                  return o.name == this.myContacts[i];
                });
              message = message.filter(o => {
                  return o.read == false;
                });
                this.unreadMessages.push(message.length)
            }
          })
        })


        this.historyChat.push(...user[0].message);
        this.historyChat.push(...user2[0].message);
        this.addressed = e.target.innerHTML;
        let historyChat1 = this.historyChat.filter(o => {
            return o.name == e.target.innerHTML.slice(0, -1);
          });
        let historyChat2 = this.historyChat.filter(o => {
            return o.name == this.userName[0];
          });

          this.historyChat = historyChat1;
          this.historyChat.push(...historyChat2);
          this.historyChat.sort((d1, d2) => new Date(d1.data).getTime() - new Date(d2.data).getTime());

      })
    })

}

openModal3(e){
  let el = e.target;
  let deleteThisContact = el.parentNode.firstChild.innerHTML.slice(0, -1);
  this.deleteExistingContact.push(deleteThisContact);
  this.modalRef = this.modalService.show(DeleteExistingContactComponent,{
    backdrop  : 'static',
 keyboard  : false,
    initialState:{
      title: deleteThisContact,
      data:{}
    }
  });
  this.modalRef.content.deleteExistingContact.subscribe((value) => {
    this.httpService.getMessageUserByName(this.userName[0]).subscribe(user=>{
      // let allDeleteExistingContact = user[0].deleteExistingContact;
      //     allDeleteExistingContact.push(deleteThisContact);
        this.myContacts = this.myContacts.filter(o => {
            return o !== this.deleteExistingContact[0];
          });
          console.log(this.myContacts);
          // newDeletecontact.shift();
          const messageUser2 = ({
            id: this.userId[0],
            // deleteExistingContact:allDeleteExistingContact,
            contacts:this.myContacts
          })
          this.httpService.getMessageUserByName(deleteThisContact).subscribe(user2=>{
            let allDeleteExistingContact = user2[0].deleteExistingContact;
                allDeleteExistingContact.push(this.userName[0]);
                const messageUser = ({
                  id: user2[0].id,
                  deleteExistingContact:allDeleteExistingContact,
                  // contacts:this.myContacts
                })
          this.httpService.updateMessageUser(messageUser2).subscribe(user2=>{
            this.httpService.updateMessageUser(messageUser).subscribe(user2=>{
              this.deleteExistingContact= [];
              this.refreshCompontentChat();
            })
          })
        })
    })
  })
}
  back() {
    this._location.back();
  }
}
