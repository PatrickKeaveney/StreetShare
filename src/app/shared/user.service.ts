import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'

interface user {
	firstName: string,
	lastName: string,
	email: string,
	uid: string
}
interface Beneficiary {
	password: string,
	bid: string
}

@Injectable()
export class UserService {
	private user: user
	private Beneficiary: Beneficiary
	constructor(private afAuth: AngularFireAuth) {
	}
	setUser(Uid: user) {
		this.user = Uid
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
				uid: user.uid
			})

			return true
		}
		return false
	}
	getUID(): string {
		return this.user.uid
	}
	/*getBid(): string {
		return this.Beneficiary.bid
	}
	getBeneficiaryPassword(): string {
		return this.Beneficiary.password
	}*/
}