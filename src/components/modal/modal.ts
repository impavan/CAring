import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

/**
 * Generated class for the ModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {

  @Output() closeClicked = new EventEmitter();
  @ViewChild('modal') modal;
  @Input('title') modalTitle: string;
  public title: string;
  public openModal: any;
  public state: any;

  constructor() {
    this.openModal = false;
  }

  ngOnInit() {
    this.title = this.modalTitle;
    this.openModal = false;
    this.state = 'hide';
  }

  open() {
    this.openModal = true;
    this.state = 'show';
  }

  close() {
    this.openModal = false;
    this.state = 'hide';
  }

}
