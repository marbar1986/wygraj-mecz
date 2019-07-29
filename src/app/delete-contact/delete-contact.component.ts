import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.scss']
})
export class DeleteContactComponent implements OnInit {
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
