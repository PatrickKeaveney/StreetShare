import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-simon-com',
  templateUrl: './simon-com.page.html',
  styleUrls: ['./simon-com.page.scss'],
})
export class SimonComPage implements OnInit {

  BranchId: any;  //<- equals [(ngModel)]="filtermonthwise" in html;

  constructor(public alertController: AlertController, 
              private iab: InAppBrowser,
              public popoverCtrl: PopoverController) { }

  ngOnInit() {
  }
  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: myEvent,
      translucent: false
    });
    return await popover.present();
  }
  visitSite(){
    if(this.BranchId == "Cork"){
      const browser = this.iab.create('https://www.corksimon.ie');
    }
    if(this.BranchId == "Dublin"){
      const browser = this.iab.create('https://www.dubsimon.ie');
    }
    if(this.BranchId == "Dundalk"){
      const browser = this.iab.create('http://www.dundalksimon.ie');
    }
    if(this.BranchId == "Galway"){
      const browser = this.iab.create('https://www.galwaysimon.ie');
    }
    if(this.BranchId == "Midlands"){
      const browser = this.iab.create('https://www.simon.ie/MidlandsSimon.aspx');
    }
    if(this.BranchId == "Mid_West"){
      const browser = this.iab.create('http://www.midwestsimon.ie/');
    }
    if(this.BranchId == "North_West"){
      const browser = this.iab.create('http://www.northwestsimon.ie');
    }
    if(this.BranchId == "South_East"){
      const browser = this.iab.create('https://www.southeastsimon.ie/');
    }
    if(this.BranchId == "National_Office"){
      const browser = this.iab.create('https://www.simon.ie/home.aspx');
    }
    else{
      this.presentAlert('Please Select Branch')
    }
  }

  donate(){
    console.log("Branch:" + this.BranchId);
    
    if(this.BranchId == "Cork"){
      const browser = this.iab.create('https://www.corksimon.ie/donate/');
    }
    if(this.BranchId == "Dublin"){
      const browser = this.iab.create('https://www.dubsimon.ie/donate/');
    }
    if(this.BranchId == "Dundalk"){
      const browser = this.iab.create('http://www.dundalksimon.ie/index.php?page=online-donation');
    }
    if(this.BranchId == "Galway"){
      const browser = this.iab.create('https://www.galwaysimon.ie/donate-now/');
    }
    if(this.BranchId == "Midlands"){
      const browser = this.iab.create('http://gateway.midlandssimon.com/donate.php');
    }
    if(this.BranchId == "Mid_West"){
      const browser = this.iab.create('https://www.paypal.com/donate/?token=ZTW_xXbr66F6vEFOrHKw2jE79lpnUXXrzq3vQScWxYePlEKrhVEaomLtoDTHNtKEl6vBC0&country.x=IE&locale.x=IE');
    }
    if(this.BranchId == "North_West"){
      const browser = this.iab.create('http://www.northwestsimon.ie/?pagid=donate');
    }
    if(this.BranchId == "South_East"){
      const browser = this.iab.create('https://www.southeastsimon.ie/donate/');
    }
    if(this.BranchId == "National_Office"){
      const browser = this.iab.create('https://www.simon.ie/Donate/tabid/158/View/1/Default.aspx');
    }
    else{
      this.presentAlert('Please Select Branch')
    }
  }
  async presentAlert(content: string) {
		const alert = await this.alertController.create({
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }
}
