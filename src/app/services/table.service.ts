import {Injectable} from '@angular/core';
import {Table} from '../rightcontent/layout/table.model';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({providedIn: 'root'})
export class TableService {

  private functions;
  private addTableFunction;
  private setPossibleConnectionForTables;
  private unDisplayTables;
  private disconnectMergedTablesFunction;

  constructor(private afs: AngularFirestore) {
    this.functions = firebase.functions();
    this.addTableFunction = this.functions.httpsCallable('addTable');
    this.setPossibleConnectionForTables = this.functions.httpsCallable('setPossibleConnectionForTables');
    this.unDisplayTables = this.functions.httpsCallable('unDisplayTables');
    this.disconnectMergedTablesFunction = this.functions.httpsCallable('disconnectMergedTables');
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

  getConnectableTables(restId: string, tableId: string): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.collection(`/RestAlfa/${restId}/Tables/${tableId}/connectableTables`).valueChanges()
        .subscribe(x => {
          observer.next(x.map((y: { id: string }) => y.id));
        });
    });
  }

  setPossibleConnection(restId: string, connectableFromId: string, connectableToId: string) {
    return new Promise((resolve, reject) => {
      this.setPossibleConnectionForTables({
        restId,
        tables: [connectableFromId, connectableToId]
      })
        .then(resolve)
        .catch(reject);
    });
  }

  createMergedTable(restId: string, mergedTable: Table, table1: Table, table2: Table) {
    return new Promise((resolve, reject) => {
      this.createTable(restId, mergedTable)
        .then(x => {
          this.unDisplayTables({restId, tables: [table1, table2]})
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  disconnectMergedTable(restId: string, mergedTable: Table) {
    return new Promise((resolve, reject) => {
      this.disconnectMergedTablesFunction({restId, mergedTable})
        .then(resolve)
        .catch(reject);
    });
  }
}
