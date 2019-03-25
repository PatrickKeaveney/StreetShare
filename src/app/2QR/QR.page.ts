import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-QR',
  templateUrl: 'QR.page.html',
  styleUrls: ['QR.page.scss']
})
export class QRPage implements OnInit {

  constructor(
    public qrScanner: QRScanner,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.doIt();
  }

  doIt() { 
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
         alert('authorized');

        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);


          //alert(text); // Show text in alert
          //alert('scanned');
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
          this.navCtrl.navigateForward('/view-profile/' + text); // If Scanner has scanned the data go back
        });

        this.qrScanner.resumePreview();

        // show camera preview
        this.qrScanner.show()
        .then((data : QRScannerStatus)=> { 
          console.log('Data status', data);
          //alert(data.showing);
        },err => {
          alert(err);
        });
        // wait for user to scan something, then the observable callback will be called
      } else if (status.denied) {
        alert('denied');
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
        alert('else');
      }
    })
    .catch((e: any) => {
      alert('Error is' + e);
    });
  }
}
