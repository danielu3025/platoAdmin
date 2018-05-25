import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable'
// import {AngularFireUploadTask} from "angularfire2/storage";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  // //Main task
  // task: AngularFireUploadTask;
  //
  // //Progress monitoring
  // precentage: Observable<number>;
  //
  // snapshot: Observable<any>;
  //
  // //DownLoad URL
  // downloadURL:Observable<string>;

  constructor() { }

  ngOnInit() {
  }

}
