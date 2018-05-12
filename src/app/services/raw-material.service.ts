import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {RawMaterial} from '../rightcontent/stock/stock.model';

@Injectable()
export class RawMaterialService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  get(restId: string): Observable<RawMaterial[]> {
    return this.afs.collection('RestAlfa').doc(restId).collection('WarehouseStock')
      .snapshotChanges()
      .map(data => {

        return data.map(data => {
          const value = data.payload.doc.data().value;

          const rawMaterial: RawMaterial = {
            id: data.payload.doc.id,
            name: value.name,
            amount: value.amount,
            redLine: value.redLine,
            type: value.type,
            units: value.unit
          };

          return rawMaterial;
        });
      });
  }
}
