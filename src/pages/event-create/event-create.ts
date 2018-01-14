/*
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: "page-event-create",
  templateUrl: "event-create.html"
})
export class EventCreatePage {
  public userEmail: any;
  public currentUser: firebase.User;

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public profileProvider: ProfileProvider,
  ) {}


  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userEmail = userProfileSnapshot.val().email;

      Date.now = function now() {
        return new Date().getTime();
      }
    });
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventGame: string,
    eventVenue: string,
    eventCity: string,
    eventDescription: string,
    eventSubcategory: string,
    eventSeats: number,
    eventAvailableSeats: number,
    createAt: string,
    createBy: string
  ): void {
    this.eventProvider.createEvent(
        eventName, 
        eventDate, 
        eventGame,
        eventVenue,
        eventCity,
        eventDescription,
        eventSubcategory,
        eventSeats,
        eventSeats,
        Date(),
        this.userEmail
      )
      .then(newEvent => {
        this.navCtrl.pop();
      });
  } 
}

*/