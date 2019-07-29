import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  @Output()
  addNewConntact =  new EventEmitter<boolean>();
  title;
  constructor(public modalRef:BsModalRef) { }

  addContact(){
    this.addNewConntact.emit(true);
  }

  foregetContact(){
    this.addNewConntact.emit(false);
  }
  ngOnInit() {
  }

}
