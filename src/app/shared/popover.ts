import { Component } from '@angular/core';
import { ModalController, PopoverController  } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
    template: 
      `<ion-list>
        <ion-item (click)="signOut()">Logout</ion-item>
        <ion-item (click)="donations()">Donations</ion-item>
        <ion-item (click)="contactUs()">Contact Us</ion-item>
      </ion-list>`
  })
  export class PopoverPage {
    constructor(public modalCtrl: ModalController,
                private authService: AuthService,
                public router: Router,
                private popoverCtrl: PopoverController,
                private emailComposer: EmailComposer) {}

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
    contactUs(){
      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
        });
        
        let email = {
          to: 'pakkeav@gmail.com',
          cc: 'erika@mustermann.de',
          bcc: ['john@doe.com', 'jane@doe.com'],
          attachments: [
            'file://img/logo.png',
            'res://icon.png',
            'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
            'file://README.pdf'
          ],
          subject: 'Paypal',
          body: 'How are you? Nice greetings from Leipzig',
          isHtml: true
        }
        // Send a text message using default options
      this.emailComposer.open(email);
    }
  }
  