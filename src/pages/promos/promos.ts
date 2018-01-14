import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  Platform } from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { GeocoderProvider } from '../../providers/geocoder/geocoder';


@IonicPage()
@Component({
  selector: 'page-promos',
  templateUrl: 'promos.html',
})
export class PromosPage {

  /**
    * Define a FormGroup object for the forwardGeocoding form
    */
       public form                   : FormGroup;
    
       /**
        * Define a FormGroup object for the reverseGeocoding form
        */
       public geoForm                : FormGroup;
    
       /**
        * Define a boolean property to reference whether geocoding has been
        * performed or not
        */
       public geocoded               : boolean;

       /**
        * Define a string value to handle returned geocoding results
        */
       public results                : string;

       /**
        * Define the initial text value for the form switching button in the
        * HTML template
        */
       public filter                 : string      = 'Search by Coordinates';

       /**
        * Define a boolean property to determine that the forwardGeocoding
        * form is displayed first
        */
       public displayForward         : boolean     = true;

       /**
        * Define a boolean property to determine that the reverseGeocoding
        * form is not to be displayed first
        */
       public displayReverse         : boolean     = false;

       constructor(public navCtrl    : NavController,
                   public _GEOCODE   : GeocoderProvider,
                   private _FB       : FormBuilder,
                   private _PLATFORM : Platform
                  )
       {
    
    
          // Define the validation rules for handling the
          // address submission from the forward geocoding form
          this.form       = _FB.group({
             'keyword'        : ['', Validators.required]
          });
    
    
          // Define the validation rules for handling the
          // latitude/longitude submissions from the reverse
          // geocoding form
          this.geoForm    = _FB.group({
             'latitude'        : ['', Validators.required],
             'longitude'       : ['', Validators.required]
          });
    
       }
    
    
    
       /**
         *
         * Determine whether the forwardGeocoding or
         * reverseGeocoding form will be displayed
         *
         * @public
         * @method filterForm
         * @return {none}
         *
         */
       filterForm()
       {
          if(this.displayForward)
          {
             this.filter      		 = 'Search by keyword';
             this.displayReverse     = true;
             this.displayForward     = false;
          }
          else
          {
             this.filter             = 'Search by Co-ordinates';
             this.displayReverse     = false;
             this.displayForward     = true;
          }
       }
    
    
    
    
       /**
         *
         * Retrieve latitude/longitude coordinate values from HTML form,
         * pass these into the reverseGeocode method of the Geocoder service
         * and handle the results accordingly
         *
         * @public
         * @method performReverseGeocoding
         * @return {none}
         *
         */
       performReverseGeocoding(val)
       {
          this._PLATFORM.ready()
          .then((data : any) =>
          {
             let latitude     : any = parseFloat(this.geoForm.controls["latitude"].value),
                 longitude    : any = parseFloat(this.geoForm.controls["longitude"].value);
    
             this._GEOCODE.reverseGeocode(latitude, longitude)
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
    
    
    
    
       /**
         *
         * Retrieve address location submitted from HTML form,
         * pass these into the forwardGeocode method of the Geocoder service
         * and handle returned latitude/longitude coordinate values accordingly
         *
         * @public
         * @method performForwardGeocoding
         * @return {none}
         *
         */
       performForwardGeocoding(val)
       {
          this._PLATFORM.ready()
          .then((data : any) =>
          {
             let keyword : string = this.form.controls["keyword"].value;
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

}
