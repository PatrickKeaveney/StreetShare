import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { beneficiary } from './../shared/beneficiary.model';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { Subscription } from 'rxjs';
import { NavController, IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { Response } from '@angular/http';

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
  data: any;
  d: any;
  distance: string;
  MyLat: number;
  MyLong: number;
  productList: beneficiary[] = [];
  constructor(private db: AngularFireDatabase, private geolocation: Geolocation, private beneficiaryService: beneficiary_list, private navCtrl: NavController, public popoverCtrl: PopoverController){
    
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
        if (v.firstName.toLowerCase().indexOf(q.toLowerCase()) > +1) {
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
    this.getCurrentLocation();
    //console.log("CL" + p );
    this.sub = this.beneficiaryService.allBeneficiaries().subscribe(data => {
      this.allBeneficiary = data.map(e => {
        return {
          Bid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as beneficiary;
      });
     this.data = this.allBeneficiary.map((data) =>  {
        if(data.latitude != null){
          this.data = this.applyHaversine(data.latitude, data.longitude)
          data.distance = this.data
         // console.log("UL: "+data.firstName +"/   " + data.distance );
        }
        this.allBeneficiary.sort((a, b) => {
          //console.log("UL: "+ a.firstName +"/   " + a.distance );
          return (a.distance) - (b.distance);
          
        });console.log("UL: "+ data.firstName +"/   " + data.distance );
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
  

    /*this.data = this.applyHaversine(this.d.location);

    this.data.sort((locationA, locationB) => {
        return locationA.distance - locationB.distance;
    });*/
  }
  goToProfile(BId){
    console.log("THE PASSED IN ID :" + BId);
    //this.router.navigate(['view-profile'],  BId)
    this.navCtrl.navigateForward('/view-profile/' + BId);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  //calculate distance between users
  applyHaversine(lat, long){

    let usersLocation = {
      lat: this.MyLat, 
      lng: this.MyLong 
    };
    let placeLocation = {
        lat: lat,
        lng: long
    };
    this.distance = this.getDistanceBetweenPoints(usersLocation, placeLocation,'miles').toFixed(2);

    return this.distance
  }
  getCurrentLocation() {
      return this.geolocation.getCurrentPosition({timeout:15000}).then((resp) => {
        this.MyLat = resp.coords.latitude
        this.MyLong = resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  getDistanceBetweenPoints(start, end, units){
      let earthRadius = {
          miles: 3958.8,
          km: 6371
      };
      let R = earthRadius[units || 'miles'];
      let lat1 = start.lat;
      let lon1 = start.lng;
      let lat2 = end.lat;
      let lon2 = end.lng;

      let dLat = this.toRad((lat2 - lat1));
      let dLon = this.toRad((lon2 - lon1));
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;

      return d;
  }
  toRad(x){
      return x * Math.PI / 180;
  }
}

