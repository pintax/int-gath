import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-bookmark-list',
  templateUrl: 'bookmark-list.html'
})
export class BookmarkListPage {
  public bookList: Array<any>;
  public userProfile: any;

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public profileProvider: ProfileProvider
  ) {}


  
  ionViewDidLoad() {
    this.eventProvider.getBookList().on('value', bookListSnapshot => {
      this.bookList = [];
      bookListSnapshot.forEach(snap => {
        this.bookList.push({
          id: snap.key,
          name: snap.val().name,
          venue: snap.val().venue,
          city: snap.val().city,
          status: snap.val().status,
          game: snap.val().game,
          createAt: snap.val().recordAt
        });
        return false;
      });
    });

      this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val();
      });
    }

  
  goToBookmarkDetail(eventId): void {
    this.navCtrl.push('BookmarkDetailPage', { eventId: eventId });
    }

  goToCreate(): void {
    this.navCtrl.push("EventCreatePage");
    }
}