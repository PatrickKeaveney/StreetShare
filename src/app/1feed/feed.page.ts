import { Component, OnDestroy  } from '@angular/core';
import { beneficiary } from './../shared/beneficiary.model';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { Subscription } from 'rxjs';
import { NavController, PopoverController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { PopoverPage  } from '../shared/popover';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
 
export class FeedPage implements OnDestroy{

  private setDistanceBar = 4000;
  allBeneficiary: beneficiary[];
  loadedBeneficiaryList: beneficiary[];
  sub: Subscription;
  data: any;
  distance: string;
  MyLat: number;
  MyLong: number;
  
  constructor(private db: AngularFireDatabase, private geolocation: Geolocation, private beneficiaryService: beneficiary_list,  private navCtrl: NavController, public popoverCtrl: PopoverController)
  {
    this.getCurrentLocation();                                                //get users current location                     
    this.sub = this.beneficiaryService.allBeneficiaries().subscribe(data => {   //get all clients from Beneficiary collection
      this.allBeneficiary = data.map(e => {
        return {
          Bid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as beneficiary;
      });
      this.data = this.allBeneficiary.map((data) =>  {
        if(data.latitude != null){
          this.data = this.applyHaversine(data.latitude, data.longitude)  //calculate distance from user to each client
          data.distance = this.data        
        }
        this.allBeneficiary.sort((clientA, clientB) => {
          return (clientA.distance) - (clientB.distance);                       //Sort list by distance from user
        });
        console.log("Client name and distance from user: "+ data.firstName +"/" + data.distance );
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
  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: myEvent,                     //dont think this being used
      translucent: false
    });
    return await popover.present();
  }
  initializeItems(): void {
    this.allBeneficiary = this.loadedBeneficiaryList;
  }
  searchClients(searchbar) {
    this.initializeItems();
    var searchBarInput = searchbar.srcElement.value;     // set q to the value of the searchbar
    if (!searchBarInput) {                               // if the value is an empty string don't filter the items
      return;
    }
    this.allBeneficiary = this.allBeneficiary.filter((v) => {
      if(v.firstName && searchBarInput) {
        if (v.firstName.toLowerCase().indexOf(searchBarInput.toLowerCase()) > -1) { 
          return true;                                          //return list which contain the search bar string
        }
        return false;
      }
    });
    console.log(searchBarInput, this.allBeneficiary.length);
  }
  getByDistance(filterValue){
    this.initializeItems();
    var q = filterValue.srcElement.value;       //assign the distance value set by the user to q
    if (!q) {
        return;
    }
    this.data = this.allBeneficiary.map((data) =>  {
      if(data.latitude != null){
        this.data = this.applyHaversine(data.latitude, data.longitude)  //calculate distance from user to each client
        data.distance = this.data        
      }
      this.allBeneficiary = this.allBeneficiary.filter((value) => {
        if (value.distance && q) {
          if (value.distance < q) {
            return true;                          //filter list the distance value the user sets
          }
          return false;
        }
      });
      this.allBeneficiary.sort((clientA, clientB) => {
        return (clientA.distance) - (clientB.distance);                       //Sort list by distance from user
      });
    });
  }
  sortByAge(){
    this.data = this.allBeneficiary.map((data) =>  {
      if(data.age != null){
      this.allBeneficiary.sort((clientA, clientB) => {                      //Sort list by Age
          return (clientA.age) - (clientB.age);                       
        });
      }
    });
  }
  goToProfile(BId){
    console.log("THE PASSED IN ID :" + BId);
    this.navCtrl.navigateForward('/view-profile/' + BId);                //go to the selected clients profile page
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  applyHaversine(lat, long){                  //calculate distance between the user coordinates and the clients coordinates
    let usersLocation = {
      lat: this.MyLat, 
      lng: this.MyLong 
    };
    let placeLocation = {
        lat: lat,
        lng: long
    };
    this.distance = this.getDistanceBetweenPoints(usersLocation, placeLocation).toFixed(2);   //set distance to 2 decimal points
    return this.distance
  }
  getCurrentLocation() {
      return this.geolocation.getCurrentPosition({timeout:15000}).then((resp) => {
        this.MyLat = resp.coords.latitude
        this.MyLong = resp.coords.longitude               //get the current coordinates of the user and assign it to myLat, MyLong
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  getDistanceBetweenPoints(userLocation, clientLocation){
      let earthRadius = 6371                                   // radius of earth in kilometers                         
      let lat1 = userLocation.lat;
      let lon1 = userLocation.lng;
      let lat2 = clientLocation.lat;
      let lon2 = clientLocation.lng;

      let dLat = this.toRadians((lat2 - lat1));
      let dLon = this.toRadians((lon2 - lon1));
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +         // 'a' is the square of half the chord length between the points.   
          Math.cos(this.toRadians(lat1)) * 
          Math.cos(this.toRadians(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));   // 'c' is the angular distance in radians
      let distance = earthRadius * c;

      return distance;
  }
  toRadians(degrees){   
      return degrees * Math.PI / 180;   // degrees to radians formula       
  }
}

