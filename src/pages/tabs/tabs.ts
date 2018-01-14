import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //eventListRoot = 'EventListPage'
  promosRoot = 'PromosPage'
  newsRoot = 'NewsPage'
  customListRoot = 'CustomListPage'
  bookmarkListRoot = 'BookmarkListPage'
  profileRoot = 'ProfilePage'


  constructor(public navCtrl: NavController) {}

}
