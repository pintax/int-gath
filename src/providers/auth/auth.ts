import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// DB - Firebase
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthProvider {

  constructor() {}
  // Create the firebase login
    loginUser(email: string, password: string): firebase.Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);  
  }

  // Push user email and password in firebase
    signupUser(email: string, password: string): firebase.Promise<any> {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUser => {
          firebase
            .database()
            .ref(`/userProfile/${newUser.uid}/email`)
            .set(email);
        })
        .catch(error => console.error(error));
  }

  // to reset the password
    resetPassword(email: string): firebase.Promise<void> {
      return firebase.auth().sendPasswordResetEmail(email);
  }

  // Logout function
    logoutUser(): firebase.Promise<void> {
      const userId: string = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref(`/userProfile/${userId}`)
        .off();
      return firebase.auth().signOut();
   }
}
