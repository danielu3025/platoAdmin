import { Injectable } from '@angular/core';
import { Table } from '../rightcontent/layout/table.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { DbHelperService } from './db-helper.service';

@Injectable({ providedIn: 'root' })
export class TableService {

  private functions;
  private addTableFunction;
  private setPossibleConnectionForTables;
  private unDisplayTables;
  private disconnectMergedTablesFunction;
  private mergeTablesFunction;
  private validateTablesAreConnectableFunction;
  private updateTableLocationFunction;
  private mergeMovedTablesFunction;
  private deleteTableFunction;
  private updateTableFunction;

  constructor(private afs: AngularFirestore, private dbHelper: DbHelperService) {
    this.functions = firebase.functions();
    this.addTableFunction = this.functions.httpsCallable('addTable');
    this.setPossibleConnectionForTables = this.functions.httpsCallable('setPossibleConnectionForTables');
    this.unDisplayTables = this.functions.httpsCallable('unDisplayTables');
    this.disconnectMergedTablesFunction = this.functions.httpsCallable('disconnectMergedTables');
    this.mergeTablesFunction = this.functions.httpsCallable('mergeTables');
    this.validateTablesAreConnectableFunction = this.functions.httpsCallable('validateTablesAreConnectable');
    this.updateTableLocationFunction = this.functions.httpsCallable('updateTableLocation');
    this.mergeMovedTablesFunction = this.functions.httpsCallable('mergeMovedTables');
    this.deleteTableFunction = this.functions.httpsCallable('deleteTable');
    this.updateTableFunction = this.functions.httpsCallable('updateTable');
  }

  // send data to server for create a new table
  createTable(restId: string, table: Table) {
    return new Promise((resolve, reject) => {
      this.addTableFunction({ restId, table })
        .then(resolve)
        .catch(reject);
    });
  }

  // get all tables from rest
  getAllTable(restId: string): Observable<Table[]> {
    return this.afs.collection<Table>(`/${this.dbHelper.getDbRoot()}/${restId}/Tables`).valueChanges();
  }

  // get all tables that can connect to other table
  getConnectableTables(restId: string, tableId: string): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.collection(`/${this.dbHelper.getDbRoot()}/${restId}/Tables/${tableId}/connectableTables`).valueChanges()
        .subscribe(x => {
          observer.next(x.map((y: { id: string }) => y.id));
        });
    });
  }

  // send data to server for create possible connection for two tables
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

  // send data to server for merge two tables to one table
  mergeTables(restId: string, movedTable: Table, connectedToTable: Table) {
    return new Promise((resolve, reject) => {
      this.mergeTablesFunction({ restId, movedTable, connectedToTable })
        .then(resolve)
        .catch(reject);
    });
  }

  // send data to server for disconnect two tables to seprated tables
  disconnectMergedTable(restId: string, mergedTable: Table) {
    return new Promise((resolve, reject) => {
      this.disconnectMergedTablesFunction({ restId, mergedTable })
        .then(resolve)
        .catch(reject);
    });
  }

  // send data to server for cehck if two tables can connect
  validateTablesAreConnectable(restId: string, movedTable: Table, connectedToTable: Table) {
    return new Promise((resolve, reject) => {
      this.validateTablesAreConnectableFunction({ restId, movedTable, connectedToTable })
        .then(resolve)
        .catch(reject);
    });
  }

  // send data to server for update location of after moved table
  updateTableLocation(restId: string, tableId: number, newX: number, newY: number) {
    return new Promise((resolve, reject) => {
      this.updateTableLocationFunction({ restId, tableId, newX, newY })
        .then(resolve)
        .catch(reject);
    });
  }

  // send data to server for merge two tables
  mergeMovedTables(restId: string, movedTableId: string, connectedToTableId: string) {
    return new Promise((resolve, reject) => {
      this.mergeMovedTablesFunction({ restId, movedTableId, connectedToTableId })
        .then(resolve)
        .catch(reject);
    });
  }

  // send data to server to delete table
  delete(restId: string, tableId: string) {
    return this.deleteTableFunction({ restId, tableId });
  }

  // send data to server to update table
  update(restId: string, tableId: string, newTable) {
    return this.updateTableFunction({ restId, tableId, newTable });
  }
}
