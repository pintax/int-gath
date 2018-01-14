import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookmarkDetailPage } from './bookmark-detail';

@NgModule({
  declarations: [
    BookmarkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BookmarkDetailPage),
  ],
})
export class BookmarkDetailPageModule {}
