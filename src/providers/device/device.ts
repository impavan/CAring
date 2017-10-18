import { Device } from '@ionic-native/device';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DeviceProvider {

  constructor(private platform: Platform,
    private device: Device,
    private http: Http) {
    this.initializeDevice();
  }

  initializeDevice() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        localStorage.setItem('uuid', this.device.uuid);
        localStorage.setItem('model', "Android");
        localStorage.setItem('version', (this.device.model + " V-" + this.device.version));
      }
      if (this.platform.is('ios')) {
        localStorage.setItem('uuid', this.device.uuid);
        localStorage.setItem('model', "iOS");
        localStorage.setItem('version', (this.device.model + " V-" + this.device.version));
      }
    });
  }
}