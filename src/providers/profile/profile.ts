import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
// Création des variables
export class ProfileProvider {
  public userProfile: firebase.database.Reference;
  public eventListRef: firebase.database.Reference;
  public userUID: firebase.database.Reference;
  public currentUser: firebase.User;
  


  // Initialisation des variables
  // With the onAuthStateChanged() function we make sure to resolve the user first before assigning the variable
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userUID = firebase.database().ref(`/userProfile/`);
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        this.eventListRef = firebase.database().ref(`/eventList/`);
        
      }
    });
  }

  // A function that returns the user’s profile from the database
  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  getUserUID(): firebase.database.Reference {
    return this.userUID;
  }

  // a function to update the user’s name
  updateName(firstName: string, lastName: string): firebase.Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  // a function to update the address
  updateAddress(address: string): firebase.Promise<any> {
    return this.userProfile.update({ address });
  }

  // a function to update the phone number
  updatePhone(phone: number): firebase.Promise<any> {
    return this.userProfile.update({ phone });
  }  

  // a function to update the birthday
  updateDOB(birthDate: string): firebase.Promise<any> {
    return this.userProfile.update({ birthDate });
  }

  // a function to update the email
  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // a function to update the password
  updatePassword(
    newPassword: string,
    oldPassword: string
  ): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  addUserPicture(
    guestPicture: string = null
  ): firebase.Promise<any> {
    return this.userProfile
      .push()
      .then(newUserPicture => {
        if (guestPicture != null) {
          firebase
            .storage()
            .ref(`/profile/${newUserPicture.key}/profilePicture.png`)
            .putString(guestPicture, 'base64', { contentType: 'image/png' })
            .then(savedPicture => {
              this.eventListRef
                .child(`${newUserPicture.key}/profilePicture`)
                .set(savedPicture.downloadURL);
            });
        }
      });
  }

}






