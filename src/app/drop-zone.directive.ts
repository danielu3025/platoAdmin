import { Directive, HostLisener,  EventEmmiter} from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  // @Output() droped = new EventEmmiter<FileList>();
  // @Output() hovered = new EventEmmiter<boolean>();

  constructor() { }

  // @HostLisener('drop' , ['$event'])
  // onDrop($event) {
  //   $event.preventDefault();
  //   this.droped.emit($event.dataTransfer.firestore);
  //   this.hovered.emit(false);
  // }
  //
  // @HostLisener('dragover' , ['$event'])
  // onDragOver($event) {
  //   $event.preventDefault();
  //   this.hovered.emit(true);
  // }
  //
  // @HostLisener('dragleave' , ['$event'])
  // onDragOver($event) {
  //   $event.preventDefault();
  //   this.hovered.emit(false);
  //}



}
