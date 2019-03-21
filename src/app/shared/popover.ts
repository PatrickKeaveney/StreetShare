import { Component } from '@angular/core';
import { ModalController, PopoverController  } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    template: 
      `<ion-list>
        <ion-item (click)="signOut()">Logout</ion-item>
        <ion-item (click)="donations()">Donations</ion-item>
        <ion-item (click)="close()">something Else</ion-item>
      </ion-list>`
  })
  export class PopoverPage {
    constructor(public modalCtrl: ModalController,
                private authService: AuthService,
                public router: Router,
                private popoverCtrl: PopoverController) {}

    async close() {
      this.popoverCtrl.dismiss();
    }
    signOut(){
      this.authService.logout().then(() => {
        this.router.navigate(["/login"]);
      });
      this.popoverCtrl.dismiss();
    }
    donations(){
      this.router.navigate(["/payment"]);
      this.popoverCtrl.dismiss();
    }
  }