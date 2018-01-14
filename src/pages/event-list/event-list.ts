/*
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
  public eventList: Array<any>;
  public currentUser: any;

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public profileProvider: ProfileProvider
  ) {}


  
  ionViewDidLoad() {
    this.eventProvider.getEventList().on('value', eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          date: snap.val().date,
          game: snap.val().game,
          venue: snap.val().venue,
          city: snap.val().city,
          description: snap.val().description,
          subcategory: snap.val().subcategory,
          createAt: snap.val().createAt,
          email: snap.val().email
        });
        return false;
      });
    });

      this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
        this.currentUser = userProfileSnapshot.val();
        this.currentUser.id = userProfileSnapshot.key;
      });
    }

  goToEventDetail(eventId): void {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
    }

  goToCreate(): void {
    this.navCtrl.push("EventCreatePage");
    }
}

*/