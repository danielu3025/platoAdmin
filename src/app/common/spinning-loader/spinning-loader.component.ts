import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinning-loader',
  templateUrl: './spinning-loader.component.html',
  styleUrls: ['./spinning-loader.component.css']
})
export class SpinningLoaderComponent implements OnInit {

  showSpinner = false;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.showSpinner = true;
  }

  hide() {
    this.showSpinner = false;
  }
}
