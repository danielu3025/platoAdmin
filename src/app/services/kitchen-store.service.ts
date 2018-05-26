import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {KitchenStation} from '../rightcontent/kitchen/kitchen.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class KitchenStoreService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private http: HttpClient) {
  }


  get(restId: string): Observable<KitchenStation[]> {
    return Observable.create(observer => {
      this.afs.collection<KitchenStation>('RestAlfa' + restId + 'KitchenStation').valueChanges()
        .subscribe(x => {
            observer(x.map(station => {
              return {
                id: station.name,
                name: station.name
              };
            }));
          }
        );

    });
  }

  CreateKitchenStation(restId: string, id: string, name: string): void {
    this.http.post('https://us-central1-plato-9a79e.cloudfunctions.net/addGrocery',
      {
        data: {
          restId,
          grocery: {
            id: id,
            name: name,
          }
        }
      }).toPromise()
      .then(X => {
      })
      .catch(X => {
      });
  }
}
