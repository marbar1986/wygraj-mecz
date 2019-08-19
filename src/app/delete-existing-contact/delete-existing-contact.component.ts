import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-existing-contact',
  templateUrl: './delete-existing-contact.component.html',
  styleUrls: ['./delete-existing-contact.component.scss']
})
export class DeleteExistingContactComponent implements OnInit {
  @Output()
  deleteExistingContact =  new EventEmitter<boolean>();
  title;
  constructor(public modalRef:BsModalRef) { }

  deleteThisContact(){
  this.deleteExistingContact.emit(true);
  }
  ngOnInit() {
  }

}
