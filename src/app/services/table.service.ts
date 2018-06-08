import {Injectable} from '@angular/core';
import {Table} from '../rightcontent/layout/table.model';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({providedIn: 'root'})
export class TableService {

  private functions;
  private addTableFunction;

  constructor(private afs: AngularFirestore) {
    this.functions = firebase.functions();
    this.addTableFunction = this.functions.httpsCallable('addTable');
  }

  createTable(restId: string, table: Table) {
    return new Promise((resolve, reject) => {
      this.addTableFunction({restId, table})
        .then(resolve)
        .catch(reject);
    });
  }

  getAllTable(restId: string): Observable<Table[]> {
    return this.afs.collection<Table>(`/RestAlfa/${restId}/Tables`).valueChanges();
  }
}
