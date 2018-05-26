import {Component, Input, OnInit} from '@angular/core';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {KitchenStation} from './kitchen.model';
import {Global} from '../../globals.model';
import {KitchenStoreService} from '../../services/kitchen-store.service';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  @Input() restId: string;

  kitchenStations: KitchenStation[] = [];
  kitchenStation$: Observable<KitchenStation[]>;
  kitchenStation: KitchenStation = new KitchenStation();

  constructor(private kitchenStore: KitchenStoreService, private afs: AngularFirestore, private db: AngularFireDatabase) {}

  // deleteKitchenStation(restId: string, kithcenId: string) {
  //   this.kitchenStore.deleteKitchenStation(restId, kithcenId);
  // }

  ngOnInit() {
    this.kitchenStore.get(this.restId).subscribe(x => this.kitchenStations = x);
    // this.kitchenStation = new KitchenStation('', '');
    // console.log('start');
    // this.kitchenStation$ = this.kitchenStore.get(this.resturantID);
  }

  createKitchenStation() {
    this.kitchenStore.CreateKitchenStation(this.restId, this.kitchenStation.id, this.kitchenStation.name);
  }

}
