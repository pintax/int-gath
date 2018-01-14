import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { ProfileProvider } from '../../providers/profile/profile';

import { NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@Injectable()
export class EventProvider {
  public eventListRef: firebase.database.Reference;
  public guestConfirmEventRef: firebase.database.Reference;
  public customListRef: firebase.database.Reference;
  public userBookRef: firebase.database.Reference;
  public eventConfirmListRef: firebase.database.Reference;
  public userProfile: firebase.database.Reference;
  public userUID: any;
  public currentUser: any = {};
  public profileProvider: ProfileProvider;
  public userEmail: any;
  public eventId: string;


  constructor(private _GEOCODE  : NativeGeocoder) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase.database().ref(`/eventList/`);
        this.customListRef = firebase.database().ref(`/customList/`);
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}/email`);
        this.userBookRef = firebase.database().ref(`/userBook/${user.uid}`);
      }
    });
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.currentUser = userProfileSnapshot.val();
      this.userEmail = userProfileSnapshot.val().email;
      this.currentUser.id = userProfileSnapshot.key;
    });

      Date.now = function now() {
        return new Date().getTime();
      }
  }

//------------------------------------------//
//-------------- EventList -----------------//
//------------------------------------------//
  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): firebase.database.Reference {
    return this.eventListRef.child(eventId);
  }

  getGuestConfirmList(
    eventId: string,
  ): firebase.database.Reference {
    return this.eventListRef.child(`${eventId}/guestList/confirm/`);
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
  ): firebase.Promise<any> {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      game: eventGame,
      venue: eventVenue,
      city: eventCity,
      description: eventDescription,
      subcategory: eventSubcategory,
      seats: eventSeats,
      availableSeats: eventSeats,
      createAt: Date(),
      createBy
    });
  }


//------------------------------------------//
// ----------- CustomList ------------------//
//------------------------------------------//

        //------------------------------------------//
        // ----- CustomList Récupération info ------//
        //------------------------------------------//

  getCustomList(): firebase.database.Reference {
    return this.customListRef;
  }

  getCustomDetail(eventId: string): firebase.database.Reference {
    return this.customListRef.child(eventId);
  }

  getCustomRecordList(
    eventId: string,
  ): firebase.database.Reference {
    return this.customListRef.child(`${eventId}/guestList/record/`);
  }

  getCustomBookmarkList(
    eventId: string,
  ): firebase.database.Reference {
    return this.customListRef.child(`${eventId}/guestList/bookmark/`);
  }

        //------------------------------------------//
        // ---------- CustomEvent Create ------------//
        //------------------------------------------//

  createCustom(
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
    createBy: string,
    confirmation: string,
    latitude: string,
    longitude: string
  ): firebase.Promise<any> {
    return this.customListRef.push({
          name: eventName,
          date: eventDate,
          game: eventGame,
          venue: eventVenue,
          city: eventCity,
          description: eventDescription,
          subcategory: eventSubcategory,
          seats: eventSeats,
          availableSeats: eventSeats,
          createAt: Date(),
          createBy,
          confirmation: "not_confirmed",
          latitude,
          longitude
        });    
  }

        //------------------------------------------//
        // -------- CustomEvent Confirmation---------//
        //------------------------------------------//

  confirmCustomEvent(
    eventId: string,
    confirmation: string
  ): firebase.Promise<any> {
    return this.customListRef
      .child(`${eventId}`).update(
        {confirmation: "Confirmed"}
      )
  }

        //------------------------------------------//
        // -------- CustomEvent Cancel --------------//
        //------------------------------------------//

  cancelConfirmationCustomEvent(
    eventId: string,
    confirmation: string
  ): firebase.Promise<any> {
    return this.customListRef
      .child(`${eventId}`).update(
        {confirmation: "not_confirmed"}
      )
  }


  cancelCustomEvent(
    eventId: string,
  ): firebase.Promise<any> {
    return this.customListRef
      .child(`${eventId}`)
      .remove();
      
  }

    //------------------------------------------//
    // ---------- CustomEvent Modify -----------//
    //------------------------------------------//

      updateCustomName(eventId: string, name: string): firebase.Promise<any> {
        return this.customListRef.child(eventId).update({ name });
      }

      updateCustomCity(eventId: string, city: string): firebase.Promise<any> {
        return this.customListRef.child(eventId).update({ city });
      }

      updateCustomVenue(eventId: string, venue: string): firebase.Promise<any> {
        return this.customListRef.child(eventId).update({ venue });
      }

      updateCustomDate(eventId: string, date: string): firebase.Promise<any> {
        return this.customListRef.child(eventId).update({ date });
      }

      updateCustomDescription(eventId: string, description: string): firebase.Promise<any> {
        return this.customListRef.child(eventId).update({ description });
      }

      updateCustomSeats(eventId: string, seats: string): firebase.Promise<any> {
        return this.customListRef.child(eventId).update({ seats });
      }


//------------------------------------------//
//----------- BookmarkList -----------------//
//------------------------------------------//

  getBookList(): firebase.database.Reference {
    return this.userBookRef;
  }

  getBookmarkDetail(eventId: string): firebase.database.Reference {
    return this.userBookRef.child(eventId);
  }

  // add to user bookmark 
  addEventBookmark(
    email,
    eventId: string,
    userUID: string
  ): firebase.Promise<any> {
    return this.customListRef
      .child(`${eventId}/guestList/bookmark/${userUID}`)
      .set({ 
        email 
      })
  }

  addUserBookmark(
    eventId: string,
    eventName: string,
    eventDate: string,
    eventGame: string,
    eventVenue: string,
    eventCity: string,
    recordAt: string, 
    status: string
  ): firebase.Promise<any> {
    return this.userBookRef.child(`${eventId}`).set({
      name: eventName,
      date: eventDate,
      game: eventGame,
      venue: eventVenue,
      city: eventCity,
      recordAt: Date(),
      status: status
    });
  }


  
//------------------------------------------//
// ------- Record user for a event ---------//
//------------------------------------------//

  addEventRecord(
    email,
    eventId: string,
    userUID: string
  ): firebase.Promise<any> {
    return this.customListRef
      .child(`${eventId}/guestList/record/${userUID}`)
      .set({ 
        email 
      })
      .then( guestRecord => {
        this.customListRef.child(eventId).transaction(customEvent => {
          customEvent.availableSeats -= 1;
          return customEvent;
        })
      });
  } 

  cancelEventRecord(
    eventId: string,
    userUID: string
  ): firebase.Promise<any> {
    return this.customListRef
      .child(`${eventId}/guestList/record/${userUID}`)
      .remove()
      .then( guestRecord => {
        this.customListRef.child(eventId).transaction(customEvent => {
          customEvent.availableSeats +=1;
          return customEvent;
        })
      });
  } 


  deleteEventBookmark(
    eventId: string,
    userUID: string
  ): firebase.Promise<any> {
    return this.customListRef
      .child(`${eventId}/guestList/bookmark/${userUID}`)
      .remove();
  }

  addUserRecord(
    eventId: string,
    eventName: string,
    eventDate: string,
    eventGame: string,
    eventVenue: string,
    eventCity: string,
    recordAt: string, 
    status: string
  ): firebase.Promise<any> {
    return this.userBookRef.child(`${eventId}`).set({
      name: eventName,
      date: eventDate,
      game: eventGame,
      venue: eventVenue,
      city: eventCity,
      recordAt: Date(),
      status: status
    });
  }

  cancelUserBookRecord(
    eventId: string,
    ): firebase.Promise<any> {
      return this.userBookRef.child(`${eventId}`).remove();
    }
  }