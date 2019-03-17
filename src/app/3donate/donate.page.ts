import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {

  constructor(public router: Router,
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
  goToFocus(){
    this.router.navigate(['/focus-ire']);
  }
  goToSimon(){
    this.router.navigate(['/simon-com']);
  }
}
