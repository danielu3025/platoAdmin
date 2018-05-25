import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {RawMaterial} from '../rightcontent/stock/stock.model';
import {Rest} from '../rightcontent/rest/rest.model';

@Injectable()
export class RestService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  get(restId: string): Observable<Rest[]> {
    return this.afs.collection('RestAlfa').doc(restId)
      .snapshotChanges()
      .map(data => {

        return data.map(x => {
          const value = x.payload.doc.data().value;

          const rest: Rest = {
            id: value.id,
            accesability: value.accesability,
            address: value.address,
            location: {
              latitude: value.location.latitude,
              longitude: value.location.longitude,
            },
            name: value.name,
            phone: value.phone,
            picture: value.picture,
            rank: {
              rankSum: value.rank.rankSum,
              totalRanks: value.rank.totalRanks,
            },
            smoking: value.smoking,
            type: value.type
          };

          return rest;
        });
      });
  }

}