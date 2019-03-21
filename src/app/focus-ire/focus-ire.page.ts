import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PopoverPage  } from '../shared/popover';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-focus-ire',
  templateUrl: './focus-ire.page.html',
  styleUrls: ['./focus-ire.page.scss'],
})
export class FocusIrePage implements OnInit {

  cat: string = "info";

  constructor(private iab: InAppBrowser,
              public popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  donateFive(){
    const browser = this.iab.create('https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&useraction=commit&token=EC-49181300DY499772J#/checkout/guest');
  }
  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: myEvent,
      translucent: false
    });
    return await popover.present();
  }
}
