import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomCreatePage } from './custom-create';

@NgModule({
  declarations: [
    CustomCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomCreatePage),
  ],
})
export class CustomCreatePageModule {}
