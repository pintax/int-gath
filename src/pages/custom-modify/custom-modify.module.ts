import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomModifyPage } from './custom-modify';

@NgModule({
  declarations: [
    CustomModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomModifyPage),
  ],
})
export class CustomModifyPageModule {}
