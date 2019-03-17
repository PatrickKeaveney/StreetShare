import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BeneficiarySettingsPage } from './beneficiary-settings.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiarySettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BeneficiarySettingsPage]
})
export class BeneficiarySettingsPageModule {}
