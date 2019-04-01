import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { PopoverController, NavController } from '@ionic/angular';
import { PopoverPage  } from '../shared/popover';

@Component({
  selector: 'app-QR',
  templateUrl: 'QR.page.html',
  styleUrls: ['QR.page.scss']
})
export class QRPage implements OnInit {

  constructor(public qrScanner: QRScanner,
              private navCtrl: NavController, 
              public popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {              // If camera permission was granted, start scanning
        let scanSub = this.qrScanner.scan().subscribe((clientID: string) => {
          console.log('Scanned', clientID);
          this.qrScanner.hide();                     // hide camera preview
          scanSub.unsubscribe();                     // stop scanning

          this.navCtrl.navigateForward('/view-profile/' + clientID);  // If Scanner has scanned, 
                                                                      //        go to the profile that equals clientID
        });                                                           
        this.qrScanner.resumePreview();
       
        this.qrScanner.show().then((data : QRScannerStatus)=> { // show camera preview
          console.log('Data status', data);
        },err => {
          alert(err);
        });                             
      } else if (status.denied) {
        alert('denied');                  // camera permission was permanently denied
      } else {
        alert('else');                    // permission was denied, but not permanently. 
      }
    })
    .catch((e: any) => {
      alert('Error is' + e);
    });
  }
  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: null,
      translucent: false
    });
    return await popover.present();
  }
}
