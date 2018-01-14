import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookmarkListPage } from './bookmark-list';

@NgModule({
  declarations: [
    BookmarkListPage,
  ],
  imports: [
    IonicPageModule.forChild(BookmarkListPage),
  ],
})
export class BookmarkListPageModule {}
