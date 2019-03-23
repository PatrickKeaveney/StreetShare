import { Injectable } from '@angular/core';
import { beneficiary } from './beneficiary.model';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class geolocation_list {
  
  userId: string;

  constructor(private afs: AngularFirestore,
              public database: AngularFireDatabase) {}

    allLocations(): Observable<DocumentChangeAction<{}>[]> {
        return this.afs.collection('Geolocation').snapshotChanges();
    }

}
