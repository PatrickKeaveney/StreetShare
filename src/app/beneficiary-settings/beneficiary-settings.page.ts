import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficiary-settings',
  templateUrl: './beneficiary-settings.page.html',
  styleUrls: ['./beneficiary-settings.page.scss'],
})
export class BeneficiarySettingsPage implements OnInit {

  mainuser: AngularFirestoreDocument
  needs: string
  profilePic: string
  story: string
  sub
  public beneficiaryId;

  constructor(public beneficiary: UserService,
              private afs: AngularFirestore,
              private route: ActivatedRoute,) {
    this.beneficiaryId = this.route.snapshot.paramMap.get('id');
    this.mainuser = afs.doc(`Beneficiary/` + this.beneficiaryId )
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.needs = event.username
      this.profilePic = event.profilePic
      this.story = event.story
		}) 
  }

  ngOnInit() {
  }

  async updateDetails() {

	
	}
}
