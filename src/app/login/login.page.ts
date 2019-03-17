import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform  } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
	email: string = ""
  password: string = ""
  
  
  constructor(private authService: AuthService,
              public router: Router,
              public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async login() {
		const { username, email, password } = this

    this.authService.loginUser(email, password).then(authService => {	
          this.router.navigate(['/tabs'])
    }, error => {
            let alert = this.alertCtrl.create({
                message: error.message,
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert
    });
  }
  Register(){
    this.router.navigate(["/register"]);
  }
  loginAsBneficiary(){
    this.router.navigate(["/loginBeneficiary"]);
  }
}
