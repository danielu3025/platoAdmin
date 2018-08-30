import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from '../table.model';
import { StaticObject } from './new-static-object-details/StaticObject.model';
import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { SpinningLoaderComponent } from '../../../common/spinning-loader/spinning-loader.component';

@Component({
  selector: 'app-new-grid-object-details',
  templateUrl: './new-grid-object-details.component.html',
  styleUrls: ['./new-grid-object-details.component.css']
})
export class NewGridObjectDetailsComponent implements OnInit {

  @Input() isDisplayed = false;
  @Input() table: Table;

  @Output() newTableCreated: EventEmitter<Table> = new EventEmitter<Table>();
  @Output() creationCancled: EventEmitter<any> = new EventEmitter<any>();
  @Output() newStaticObjectCreated: EventEmitter<StaticObject> = new EventEmitter<StaticObject>();

  @ViewChild(SpinningLoaderComponent) spinner: SpinningLoaderComponent;

  newObjectType = 'table';
  creationCanceledObservable: Observable<any>;
  creationCanceledObserver: Observer<any>;
  isCreating = false;

  constructor() {
  }

  ngOnInit() {
    this.creationCanceledObservable = Observable.create(x => this.creationCanceledObserver = x);
  }

  showSpinner() {
    this.spinner.show();
    this.isCreating = true;
  }

  hideSpinner() {
    this.spinner.hide();
    this.isCreating = false;
  }

  // Emit to parent component that table was created
  newTableCreatedEvent(e) {
    this.showSpinner();
    this.newTableCreated.emit(e);
  }

  // Emit to parent component that creation was canceled
  creationCancledEvent(e) {
    this.creationCancled.emit(e);
  }

  // Emit to parent component that static object was created
  newStaticObjectCreatedEvent(e) {
    this.showSpinner();
    this.creationCanceledObserver.next({});
    this.newStaticObjectCreated.emit(e);
  }
}
