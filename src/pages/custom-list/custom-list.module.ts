import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomListPage } from './custom-list';

@NgModule({
  declarations: [
    CustomListPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomListPage),
  ],
})
export class CustomPageModule {}
