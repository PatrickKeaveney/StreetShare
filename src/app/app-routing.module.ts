import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './shared/auth.service'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' , canActivate: [AuthService] },
  { path: 'view-profile', loadChildren: './view-profile/profile.module#ProfilePageModule' },
  { path: 'view-profile/:id', loadChildren: './view-profile/profile.module#ProfilePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'beneficiary-settings', loadChildren: './beneficiary-settings/beneficiary-settings.module#BeneficiarySettingsPageModule' },
  { path: 'beneficiary-settings/:id', loadChildren: './beneficiary-settings/beneficiary-settings.module#BeneficiarySettingsPageModule' },
  { path: 'focus-ire', loadChildren: './focus-ire/focus-ire.module#FocusIrePageModule' },
  { path: 'simon-com', loadChildren: './simon-com/simon-com.module#SimonComPageModule' },
  { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
