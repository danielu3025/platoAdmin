import {Component, OnInit} from '@angular/core';
import {Worker} from '../worker.model';
import {WorkersService} from '../../../services/workers.service';
import {UserInfoService} from '../../../services/user-info.service';

@Component({
  selector: 'app-manage-workers',
  templateUrl: './manage-workers.component.html',
  styleUrls: ['./manage-workers.component.css']
})
export class ManageWorkersComponent implements OnInit {

  restId: string;
  workers: Worker[];

  constructor(private workersService: WorkersService, private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => {
      this.restId = x;
      this.workersService.getAll(this.restId).subscribe(x => this.workers = x);
    });
  }

}
