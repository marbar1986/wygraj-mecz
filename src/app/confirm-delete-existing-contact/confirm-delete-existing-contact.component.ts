import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-delete-existing-contact',
  templateUrl: './confirm-delete-existing-contact.component.html',
  styleUrls: ['./confirm-delete-existing-contact.component.scss']
})
export class ConfirmDeleteExistingContactComponent implements OnInit {
  @Output()
  deleteNewContact =  new EventEmitter<boolean>();
  title;
  constructor(public modalRef:BsModalRef) { }

deleteContact(){
  this.deleteNewContact.emit(true);
}
  ngOnInit() {
  }

}
