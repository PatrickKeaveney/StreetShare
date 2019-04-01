import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FcmService {

  constructor(private firebase: Firebase, private afs: AngularFirestore, private platform: Platform) {}

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();         //create token for android
    }
    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();         //create token for ios
      await this.firebase.grantPermission();
    }
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');      // create/locate devices collection in database
    const data = {                                          //assign the device token and userid
      token,
      userId: 'testUserId'
    };
    return devicesRef.doc(token).set(data);
  }
  onNotifications() {
    return this.firebase.onNotificationOpen();               //call firebase 
  }
}