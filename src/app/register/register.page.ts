import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	firstName: string = ""
	lastName: string = ""
	email: string = ""
	profilePicture: string = ""
	password: string = ""
	cpassword: string = ""
	isChecked: false
	transactions: string =""

	constructor(public alertController: AlertController,
              public afAuth: AngularFireAuth,
              public user: UserService,
              public afstore: AngularFirestore,
              public router: Router) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }
  async register() {
		const { firstName, lastName, email, password, cpassword, transactions } = this
		if(password !== cpassword) {
			return console.error("Passwords don't match")
		}
		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)

			this.user.setUser({
				firstName,
				lastName,
				email,
				uid: res.user.uid,
				transactions,
			})

			this.afstore.doc(`users/${res.user.uid}`).set({
				firstName,
				lastName,
				email,
				uid: res.user.uid,
				transactions
			})
			this.presentAlert('Success', 'You are registered!')
			this.router.navigate(['/login'])

		} catch(error) {
			console.dir(error)
		}
	}
	ToLogin(){
		this.router.navigate(["/login"]);
	  }
}
