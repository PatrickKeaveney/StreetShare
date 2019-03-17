import { Component, OnInit, OnDestroy } from '@angular/core';
import { beneficiary } from './../shared/beneficiary.model';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { Subscription } from 'rxjs';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})

export class FeedPage implements OnInit, OnDestroy{

  allBeneficiary: beneficiary[];
  loadedBeneficiaryList: beneficiary[];
  sub: Subscription;
  beneficiaries
  BeneficiaryList:Array<any>;

  constructor(private beneficiaryService: beneficiary_list, private navCtrl: NavController, public popoverCtrl: PopoverController){
    //this.loadedBeneficiaryList = this.allBeneficiary;
  }
  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: myEvent,
      translucent: false
    });
    return await popover.present();
  }
  initializeItems(): void {
    this.allBeneficiary = this.loadedBeneficiaryList;
  }
  getItems(searchbar) {

    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.allBeneficiary = this.allBeneficiary.filter((v) => {
      if(v.firstName && q) {
        if (v.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.allBeneficiary.length);
  }
  ngOnInit() {
    this.sub = this.beneficiaryService.allBeneficiaries().subscribe(data => {
      this.allBeneficiary = data.map(e => {
        return {
          Bid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as beneficiary;
      });
    });
    this.sub = this.beneficiaryService.allBeneficiaries().subscribe(data => {
      this.loadedBeneficiaryList = data.map(e => {
        return {
          Bid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as beneficiary;
      });
    });
  }
  goToProfile(BId){
    console.log("THE PASSED IN ID :" + BId);
    //this.router.navigate(['view-profile'],  BId)
    this.navCtrl.navigateForward('/view-profile/' + BId);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

