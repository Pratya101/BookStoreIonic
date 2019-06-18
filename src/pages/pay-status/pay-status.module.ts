import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayStatusPage } from './pay-status';

@NgModule({
  declarations: [
    PayStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(PayStatusPage),
  ],
})
export class PayStatusPageModule {}
