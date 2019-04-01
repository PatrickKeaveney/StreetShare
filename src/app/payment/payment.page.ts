import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import 'firebase/firestore';
import { beneficiary } from './../shared/beneficiary.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage{
  mainuser: AngularFirestoreDocument
  sub
  allBeneficiary: beneficiary[]
  transactions = []
  allBid = []
  allDonations = []
  data: void[];
  
  constructor(public navCtrl: NavController, private beneficiaryService: beneficiary_list, private user: UserService, private afs: AngularFirestore, public route: ActivatedRoute) {
    this.sub = this.beneficiaryService.allBeneficiaries().subscribe(data => {
      this.allBeneficiary = data.map(e => {
        return {
          Bid: e.payload.doc.id,            
          ...e.payload.doc.data()
        } as beneficiary;
      });
    });
    this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.transactions = event.transactions                        //get the array of transaction for Database
      this.splitValues(this.transactions)                             //pass transactions into splitValues method
    }) 
  }
  async splitValues(tran){
    for (let i of tran) {                                 //loop through while assigning transaction element to i
      console.log(i)
      var amount = i.split("/", 1);                       //split into donation amount
      this.allDonations.push(amount);                     //assign donation amount to allDonations
      
      var Bid = i.substring(2);                           //split into substring which depicts one of the client' IDs
      this.allBid.push(Bid);                              //assign Bid string to allBid
    }
    this.getBeneficiary()                               //call getBeneficiary method
  }
  getBeneficiary(){
    this.allBeneficiary = this.allBeneficiary.filter((value) => {     
      for (let j in this.allBid) {                        //assign j to the index of allBid
        if(value.bid == this.allBid[j]) {                     //if a client id matches the value at allBid[j] return true
          value.amount = this.allDonations[j]                 //assign allDonation value at index j to client amount(value)
          return true;
        }
      }
      return false; 
    });
  }
}
