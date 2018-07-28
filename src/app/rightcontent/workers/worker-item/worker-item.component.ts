import {Component, Input, OnInit} from '@angular/core';
import {Worker} from '../worker.model';
import {AuthService} from '../../../services/auth.service';
import {WorkersService} from '../../../services/workers.service';

@Component({
  selector: '[appWorkerItem]',
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.css']
})
export class WorkerItemComponent implements OnInit {

  @Input() worker: Worker;
  @Input() restId: string;
  rests: string[];
  inEditMode = false;

  constructor(private authService: AuthService, private workersService: WorkersService) {
  }

  ngOnInit() {
    this.authService.getUserInfo(this.worker.email).subscribe(x => {
      this.rests = x.rests;
    });
  }

  edit() {
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

  ok() {
    this.workersService.updateWorker(this.restId, this.worker.email, this.worker.name, this.worker.role)
      .then(x => alert('updated'))
      .catch(x => {
        alert('error');
        console.log(x);
      });
  }

  delete() {
    if (!confirm(`Are you sure you want to delete ${this.worker.name}?`)) {
      return;
    }
    this.workersService.deleteWorker(this.restId, this.worker.email)
      .then(x => alert('deleted'))
      .catch(x => {
        alert('error');
        console.log(x);
      });
  }
}
