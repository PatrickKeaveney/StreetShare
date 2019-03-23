import { Injectable } from '@angular/core';
import { beneficiary } from './beneficiary.model';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class beneficiary_list {
  public beneficiary: beneficiary
  userId: string;

  constructor(private afs: AngularFirestore,
              public database: AngularFireDatabase) {}

  allBeneficiaries(): Observable<DocumentChangeAction<{}>[]> {
    return this.afs.collection('Beneficiary').snapshotChanges();
  }
  getBeneficiaryById(BId:string): Observable<any>{
    return this.afs.collection('Beneficiary/', ref => ref.where('bid','==', BId)).snapshotChanges();
  }

  getBeneficiaries(id: string): Observable<any> {
    return this.afs.collection('Beneficiary').doc(id).snapshotChanges();
  }
}
