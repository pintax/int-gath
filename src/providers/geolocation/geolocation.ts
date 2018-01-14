import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import * as GeoFire from "geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import firebase from 'firebase'; 

@Injectable()
export class GeolocationProvider {
  
  dbRef: firebase.database.Reference;;
  geoFire: any;
  hits = new BehaviorSubject([])


  constructor() {
    
    /// Reference database location for GeoFire
    this.dbRef =   firebase.database().ref('/locations');
    this.geoFire = new GeoFire(this.dbRef).ref;
    
   }

   /// Adds GeoFire data to database
   setLocation(key:string, coords: Array<number>) {
     this.geoFire.set(key, coords)
         .then(_ => console.log('location updated'))
         .catch(err => console.log(err))
   }
   
   /// Queries database for nearby locations
   /// Maps results to the hits BehaviorSubject
   getLocations(radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
      let hit = {
        location: location,
        distance: distance
      }

      let currentHits = this.hits.value
      currentHits.push(hit)
      this.hits.next(currentHits)
    })
    
   }
   
}