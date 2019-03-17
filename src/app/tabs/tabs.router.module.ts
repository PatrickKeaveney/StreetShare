import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [{
  path: '',
  component: TabsPage,
  children: [
    { path: 'feed', loadChildren: '../1feed/feed.module#FeedPageModule'  },
    { path: 'QR',  loadChildren: '../2QR/QR.module#QRPageModule' },
    { path: 'donate', loadChildren: '../3donate/donate.module#DonatePageModule' },
    { path: '', redirectTo: '/tabs/feed', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
