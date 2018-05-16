import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {RawMaterial} from '../rightcontent/stock/stock.model';

@Injectable()
export class CreateGroceryService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  CreateGrocery(restId: string, groName: string, cookingTime: number, cookingType: string, rawMaterial: object): void {
      this.afs.collection('RestAlfa' + '/' + restId + '/Grocery/').doc(groName).set({
        name: groName,
        cookingTime: cookingTime,
        cookingType: cookingType,
        rawMaterial
      });
  }
}
