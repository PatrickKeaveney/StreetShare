import { Component } from '@angular/core';
import { beneficiary } from './../shared/beneficiary.model';
import { ActivatedRoute } from '@angular/router';
import { beneficiary_list } from './../shared/beneficiary_list.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})

export class ProfilePage {
  pw: string = ""
  bid: string = ""
  public beneficiaryId;
  sub
  allBeneficiaries: beneficiary[];

  constructor(private beneficiaryService: beneficiary_list,
              public router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore,
              public popoverCtrl: PopoverController) {
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
}
