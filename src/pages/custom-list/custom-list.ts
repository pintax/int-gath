import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-custom-list',
  templateUrl: 'custom-list.html'
})
export class CustomListPage {
  public customList: Array<any>;
  public userProfile: any;

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public profileProvider: ProfileProvider
  ) {}


  
  ionViewDidLoad() {
    this.eventProvider.getCustomList().on('value', customListSnapshot => {
      this.customList = [];
      customListSnapshot.forEach(snap => {
        this.customList.push({
          id: snap.key,
          name: snap.val().name,
          date: snap.val().date,
          game: snap.val().game,
          venue: snap.val().venue,
          city: snap.val().city,
          description: snap.val().description,
          subcategory: snap.val().subcategory,
          createAt: snap.val().createAt,
          email: snap.val().email,
          latmarker: snap.val().lat,
          lngmarker: snap.val().lng
        });
        return false;
      });
      console.log(this.customList);
    });

      this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val();
      });
    }

  goToCustomDetail(eventId): void {
    this.navCtrl.push('CustomDetailPage', { eventId: eventId });
    }

  goToCreate(): void {
    this.navCtrl.push("CustomCreatePage");
    }
}