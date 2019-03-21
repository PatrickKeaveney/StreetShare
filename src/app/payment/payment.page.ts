import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import 'firebase/firestore';
import { beneficiary } from './../shared/beneficiary.model';
import { donation } from './../shared/donation.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {
  mainuser: AngularFirestoreDocument
  sub
  allBeneficiaries: beneficiary[];
  firstName:string
  email
  transactions
  donations: donation[];
  str
  sub1
  trans: string = ""
  splitted
  Bid
  private donate: donation
  
  constructor(public navCtrl: NavController, private beneficiaryService: beneficiary_list, private user: UserService, private afs: AngularFirestore, public route: ActivatedRoute) {
    this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.transactions = event.transactions
        this.setLayout(this.transactions)
    })
  }
  async setLayout(tran){
    for (let i of tran) {
      //split into amount
      var amount = i.split("/", 1); 
      //split into Bid
      this.Bid = i.substring(2);
      //this.getBeneficiary(Bid)
      
      //console.log("Bid: "+this.Bid)
    }
    console.log("amount: "+this.donations)
  }
  getBeneficiary(Bid){
    let userId = Bid
    console.log("Bid2: "+userId)
    this.sub1 = this.beneficiaryService.getBeneficiaryById(userId).subscribe(data => {
      this.allBeneficiaries = data.map(e => {
        return {
          Bid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as beneficiary;
      });
    });
  }
}
