import { StorageService } from './../../services/storage.service';
import { LocalUser } from './../../models/local_user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public localStorage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.localStorage.getLocalUser();
    if (localUser && localUser.email) {
      this.email = localUser.email;
    }
  }

}