import { Component } from '@angular/core';
import { beneficiary } from './../shared/beneficiary.model';
import { ActivatedRoute } from '@angular/router';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
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
              public popoverCtrl: PopoverController,) 
  {                                            
    this.beneficiaryId = this.route.snapshot.paramMap.get('id');    
    let userId = this.beneficiaryId;                              //id value is assigned to userId
    console.log("PASSED IN USER ID : " + userId);

    this.sub = this.beneficiaryService.getBeneficiaryById(userId).subscribe(data => {   //get client by id is called
      this.allBeneficiaries = data.map(e => {                                             //client information is returned
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
  async presentInfoAlert(item, item1, item2) {
    const alert = await this.alertController.create({
      header: item + " - "+item1,
      message: "If you would like to donate this item, the collection point is at " +item2,
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
  clearButton() {
    this.amount = 0;
  }
  donateNow(amount) {
    console.log(" Pay Amount "+this.amount);
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AXPtSIFiY2S77Qe53F3Wdjcntp6XFwrZmxpqYyGVcGKfqvvbGdCdVw17pfvf4eZKEqJJjdD5h3YqVxVi'
    }).then(() => {

      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        merchantName: 'CaseWorker'

      })).then(() => {
        let payment = new PayPalPayment(this.amount, 'EUR', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
        }, () => {
          // Error 
        }); 
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization
    });
    this.presentAlert();
    this.afs.doc(`users/${this.user.getUID()}`).update({                        //donation amount and donee id is recorded
			transactions: firestore.FieldValue.arrayUnion(`${amount}/${this.beneficiaryId}`)
    })
  }
} 
