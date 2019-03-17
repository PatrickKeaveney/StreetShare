import { Router, CanActivate } from '@angular/router'
import { UserService } from './user.service'
import * as firebase from 'firebase/app';
import {Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable()
export class AuthService{
	
	constructor(private router: Router, 
				private user: UserService,
				public afstore: AngularFirestore) {
	}
	loginUser(email: string, password: string): Promise<any> {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}
	
	async canActivate() {
		if(await this.user.isAuthenticated()) {
			return true
		}
		//this.router.navigate(['/login'])
		return false
	}
	logout(){
		return firebase.auth().signOut();
	}
	
}
	