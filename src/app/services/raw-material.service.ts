import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {RawMaterial} from '../rightcontent/stock/stock.model';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class RawMaterialService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  get(restId: string): Observable<RawMaterial[]> {
    return Observable.create(observer => {
      this.afs.collection('RestAlfa').doc(restId).collection<{ value: RawMaterial }>('WarehouseStock').valueChanges()
        .subscribe(x => {
          observer.next(x.map(x => x.value));
        });
    });
  }
}
