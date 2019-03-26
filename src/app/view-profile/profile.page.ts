import { Component } from '@angular/core';
import { beneficiary } from './../shared/beneficiary.model';
import { ActivatedRoute } from '@angular/router';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { firestore } from 'firebase/app';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})

export class ProfilePage {

  payAmount: any = 0;
  cat: string = "MyStory";
  amount: any = 0;
  pw: string = ""
  bid: string = ""
  public beneficiaryId;
  sub
  allBeneficiaries: beneficiary[];

  constructor(private beneficiaryService: beneficiary_list,
              private user: UserService,
              public router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore,
              private payPal: PayPal,
              public alertController: AlertController, 
              public popoverCtrl: PopoverController,
              ) {                                             //private emailComposer: EmailComposer

    this.beneficiaryId = this.route.snapshot.paramMap.get('id');
    let userId = this.beneficiaryId;
    console.log("PASSED USER ID : " + userId);

    
    this.sub = this.beneficiaryService.getBeneficiaryById(userId).subscribe(data => {
      this.allBeneficiaries = data.map(e => {
        return {
          Bid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as beneficiary;
      });
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Payment',
      message: 'Successful',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: myEvent,
      translucent: false
    });
    return await popover.present();
  }
  linkAccount(){
    if( this.beneficiaryId == this.bid){//password == this.pw &&
      this.router.navigate(["/beneficiary-settings"]);
      console.log("PASSED USER ID : " + this.bid);
    }
  }
  clearButton() {
    this.amount = 0;
  }
  payNow(amount) {
    console.log(" Pay Amount "+this.amount);

    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AXPtSIFiY2S77Qe53F3Wdjcntp6XFwrZmxpqYyGVcGKfqvvbGdCdVw17pfvf4eZKEqJJjdD5h3YqVxVi'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        merchantName: 'CaseWorker'
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.amount, 'EUR', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
    this.presentAlert();
    //this.sendReceipt();
    this.afs.doc(`users/${this.user.getUID()}`).update({
			transactions: firestore.FieldValue.arrayUnion(`${amount}/${this.beneficiaryId}`)
		})
  }
  /*sendReceipt(){
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
  } */
}
