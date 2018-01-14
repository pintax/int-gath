import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule } from '@agm/core';

import { TabsPage } from '../pages/tabs/tabs';


// DB - Firebase
import { environment } from './credentials';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      firebase.initializeApp(environment.firebaseConfig);
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapsKey
          })

      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.rootPage = 'ConnectionPage';
          unsubscribe();
        } else {
          this.rootPage = TabsPage;
          unsubscribe();
        }
      });
    
    });
  }
}

