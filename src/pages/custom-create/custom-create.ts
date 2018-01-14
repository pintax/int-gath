import { Component } from "@angular/core";
import { IonicPage, 
  NavController,
   Platform } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from '../../providers/profile/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeGeocoder, 
  NativeGeocoderReverseResult, 
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
  import { GeocoderProvider } from '../../providers/geocoder/geocoder';


@IonicPage()
@Component({
  selector: "page-custom-create",
  templateUrl: "custom-create.html"
})
export class CustomCreatePage {
  public userEmail: any;
  public currentUser: firebase.User;
  public eventForm: FormGroup;
  public geocoded : boolean;
  public form : FormGroup;
  public results : string;


  constructor(
    public navCtrl: NavController,
    public customProvider: EventProvider,
    public profileProvider: ProfileProvider,
    private nativeGeocoder: NativeGeocoder,
    public _GEOCODE   : GeocoderProvider,
    private _PLATFORM : Platform,
    
    formBuilder: FormBuilder
  ) {
    this.eventForm = formBuilder.group({
      customName: [
        '',
        Validators.compose([Validators.required])
      ],
      customDate: [
        '',
        Validators.compose([Validators.required])
      ],
      customVenue: [
        '',
        Validators.compose([Validators.required])
      ],
      customCity: [
        '',
        Validators.compose([Validators.required])
      ],
      customDescription: [
        '',
        Validators.compose([Validators.required])
      ],
      customGame: [
        '',
        Validators.compose([Validators.required])
      ],
      customSubcategory: [
        '',
        Validators.compose([Validators.required])
      ],
      customSeats: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }


  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userEmail = userProfileSnapshot.val().email;

      Date.now = function now() {
        return new Date().getTime();
      }
    });


  }

  performForwardGeocoding(customCity)
  {
     this._PLATFORM.ready()
     .then((data : any) =>
     {
        let keyword : string = this.form.controls[customCity].value;
        this._GEOCODE.forwardGeocode(keyword)
        .then((data : any) =>
        {
           this.geocoded      = true;
           this.results       = data;
        })
        .catch((error : any)=>
        {
           this.geocoded      = true;
           this.results       = error.message;
        });
     });
  }

  createCustom(
    customName: string,
    customDate: string,
    customGame: string,
    customVenue: string,
    customCity: string,
    customDescription: string,
    customSubcategory: string,
    customSeats: number,
    customAvailableSeats: number,
    createAt: string,
    createBy: string,
    confirmation: string
  ): void {
    this.nativeGeocoder.forwardGeocode(`${customVenue}, ${customCity}`)
    .then((coordinates: NativeGeocoderForwardResult) =>
    {
    this.customProvider.createCustom(
        customName, 
        customDate, 
        customGame,
        customVenue,
        customCity,
        customDescription,
        customSubcategory,
        customSeats,
        customSeats,
        Date(),
        this.userEmail,
        confirmation,
        coordinates.latitude,
        coordinates.longitude
      )
      .then(newEvent => {
        this.navCtrl.pop();
      })});
  } 
}