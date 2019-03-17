import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-focus-ire',
  templateUrl: './focus-ire.page.html',
  styleUrls: ['./focus-ire.page.scss'],
})
export class FocusIrePage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }

  donateFive(){
    const browser = this.iab.create('https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&useraction=commit&token=EC-49181300DY499772J#/checkout/guest');
  }
}
