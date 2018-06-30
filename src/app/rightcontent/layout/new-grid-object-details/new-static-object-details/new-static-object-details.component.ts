import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StaticObject} from './StaticObject.model';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-new-static-object-details',
  templateUrl: './new-static-object-details.component.html',
  styleUrls: ['./new-static-object-details.component.css']
})
export class NewStaticObjectDetailsComponent implements OnInit {

  @Output() newStaticObjectCreated: EventEmitter<StaticObject> = new EventEmitter<StaticObject>();

  @Input() creationCanceledEvent: Observable<any>;

  obj: StaticObject = new StaticObject();
  status = ['wc', 'bar', 'kitchen', 'wall', 'other'];

  constructor() {
  }

  ngOnInit() {
    this.creationCanceledEvent.subscribe(x => this.obj = new StaticObject());
  }

  create() {
    this.newStaticObjectCreated.emit(this.obj);
  }
}
