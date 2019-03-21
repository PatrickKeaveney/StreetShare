import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
//import * as HA from '@woocommerce/api';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})

export class SettingsPage {

 /* WooCommerce: any;
  products: any;
  moreProducts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.WooCommerce = HA({
      url: 'My Web link',
      consumerKey: 'My consumerKey',
      consumerSecret: 'My consumerSecret',
      wpAPI: true,
      version: 'wc/v3',
      queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
    })
    this.WooCommerce.get('products', function(err, data, res) {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllProductsPage');
  }*/
}