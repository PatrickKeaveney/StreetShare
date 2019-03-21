import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'

interface user {
	firstName: string,
	lastName: string,
	email: string,
	uid: string,
	transactions: string
}

@Injectable()
export class UserService {
	private user: user
	constructor(private afAuth: AngularFireAuth) {
	}
	setUser(user: user) {
		this.user = user
	}
	getFirstName(): string {
		return this.user.firstName
	}
	getLastName(): string {
		return this.user.lastName
	}
	getEmail(): string {
		return this.user.email
	}
	reAuth(email: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password))
	}
	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}
	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
	}
	async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				firstName: user.displayName,
				lastName: user.displayName,
				email: user.email,
				uid: user.uid,
				transactions: user.displayName
			})

			return true
		}
		return false
	}
	getUID(): string {
		return this.user.uid
	}
}