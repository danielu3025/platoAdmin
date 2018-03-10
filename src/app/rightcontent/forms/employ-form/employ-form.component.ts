import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-employ-form',
  templateUrl: './employ-form.component.html',
  styleUrls: ['./employ-form.component.css']
})
export class EmployFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form);


  }

}
