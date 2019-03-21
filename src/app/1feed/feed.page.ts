import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { beneficiary } from './../shared/beneficiary.model';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { Subscription } from 'rxjs';
import { NavController, IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
 
export class FeedPage implements OnInit, OnDestroy{

 // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private saturation = 100;
  allBeneficiary: beneficiary[];
  loadedBeneficiaryList: beneficiary[];
  sub: Subscription;
  beneficiaries
  BeneficiaryList:Array<any>;
  list
  currentLat
  currentLong

  constructor(private db: AngularFireDatabase, private geolocation: Geolocation, private beneficiaryService: beneficiary_list, private navCtrl: NavController, public popoverCtrl: PopoverController){
    //this.loadedBeneficiaryList = this.allBeneficiary;
    //this.locate();
  }

          //sort by geoPoint
  /*locate(){
    // set q to the value of the searchbar

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat =  resp.coords.latitude
      this.currentLong = resp.coords.longitude
    
      console.log("lat" + this.currentLat + "- long" + this.currentLong)
      // if the value is an empty string don't filter the items
      /*if (!this.currentLat || !this.currentLong) {
        return;
      }
        this.distance = this.calculateDistance(this.currentLat, 53.2707363 , this.currentLong, -9.0568973);
        console.log("dis" + this.distance)
    
    })
  }
  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }*/
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
  getYear(filterValue){
    this.initializeItems();
    var q = filterValue.srcElement.value;
    if (!q) {
        return;
    }
    //console.log("UL: "+q.upper);
    var lowerLimit = q.lower;
    var upperLimit = q.upper;
    
    this.allBeneficiary = this.allBeneficiary.filter((value) => {
      if (value.age && q) {
        if (value.age >= lowerLimit && value.age <= upperLimit) {
          return true;
        }
        return false;
      }
    });
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

