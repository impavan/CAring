import { BASE_URL, CONTENT_ID } from '../../config';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { ABOUT_US } from '../../url';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ApiProvider {
  public BASEURL: any;
  public BRANDID: any;
  public IMAGEURL: any;
  public isLive: boolean;
  // make enviroment true for live build and false for dev build
  public environment: boolean = false;

  constructor(private events: Events,
    private http: Http) {
    this.getConfiguration()
      .subscribe(res => {
        let brandIdObj = res.data.find(dt => dt.key == "brandid")
        let baseurlObj = res.data.find(dt => dt.key == "serverurl");
        let imageurlObj = res.data.find(dt => dt.key == "imagepathurl");
        let devbrandIdObj = res.data.find(dt => dt.key == "devbrandid");
        let devbaseurlObj = res.data.find(dt => dt.key == "devserverurl");
        let devimageurlObj = res.data.find(dt => dt.key == "devbrandid");
        if (this.environment) {
          this.BRANDID = brandIdObj.value;
          this.BASEURL = baseurlObj.value;
          this.IMAGEURL = imageurlObj.value;
          this.isLive = true;
        } else {
          this.BRANDID = devbrandIdObj.value;
          this.BASEURL = devbaseurlObj.value;
          this.IMAGEURL = devimageurlObj.value;
          this.isLive = false;
        }
        this.events.publish('config', true);
      });
  }

  getConfiguration() {
    return this.http.get(CONTENT_ID + ABOUT_US)
      .map((res: Response) => res)
      .do((res: Response) => res.json())
      .map((res: Response) => res.json());
  }
}