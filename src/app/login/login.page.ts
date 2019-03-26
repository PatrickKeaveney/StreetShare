import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
	email:  string = ""
  password: string = ""
  
  
  constructor(private authService: AuthService,
              public router: Router,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async login() {
		const { email, password } = this

    this.authService.loginUser(email, password).then(authService => {	
          this.router.navigate(['/tabs'])
    })
    .catch(async err => { 
        const alert = await this.alertCtrl.create({
            header: 'Error in Login',
            message: 'Please enter a valid email and password',
            buttons: ['OK']
        });
        await alert.present(); 
    })
  }
  Register(){
    this.router.navigate(["/register"]);
  }
  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email)
    .catch(async err => { 
      const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Please enter a valid registered email address',
          buttons: ['OK']
      });
      await alert.present(); 
    })
  }
}
