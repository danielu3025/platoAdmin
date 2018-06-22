import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Table} from '../table.model';
import {StaticObject} from './new-static-object-details/StaticObject.model';
import {Observer} from 'rxjs/internal/types';
import {Observable} from 'rxjs/internal/Observable';

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

  newObjectType = 'table';
  creationCanceledObservable: Observable<any>;
  creationCanceledObserver: Observer<any>;

  constructor() {
  }

  ngOnInit() {
    this.creationCanceledObservable = Observable.create(x => this.creationCanceledObserver = x);
  }

  newTableCreatedEvent(e) {
    this.newTableCreated.emit(e);
  }

  creationCancledEvent(e) {
    this.creationCancled.emit(e);
  }

  newStaticObjectCreatedEvent(e) {
    this.creationCanceledObserver.next({});
    this.newStaticObjectCreated.emit(e);
  }
}
