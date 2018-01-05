import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Import Providers.
import { AlertProvider } from '../alert/alert';

@Injectable()
export class ExceptionHandlerProvider {

  constructor(private alertProvider: AlertProvider) {
  }

  SERVER_ERROR = `something went wrong`;
  BAD_REQUEST = `Bad Request`;
  UNAUTHORIZED = `Unauthorized`;
  FORBIDDEN = `Forbidden`;
  NOT_FOUND = `Unable To Connect, Please Check Your Connection`;
  METHOD_NOT_ALLOWED = `Method Not Allowed`;
  REQUEST_TIME_OUT = `Request Timeout`;
  INTERNAL_SERVER = `Internal Server Error`;

  excpHandler(err) {
    if (err.status == 400) {
      this.alertProvider.presentToast(this.BAD_REQUEST);
      return;
    }
    if (err.status == 401) {
      this.alertProvider.presentToast(this.UNAUTHORIZED);
      return;
    }
    if (err.status == 403) {
      this.alertProvider.presentToast(this.FORBIDDEN);
      return;
    }
    if (err.status == 404) {
      this.alertProvider.presentToast(this.NOT_FOUND);
      return;
    }
    if (err.status == 405) {
      this.alertProvider.presentToast(this.METHOD_NOT_ALLOWED);
      return;
    }
    if (err.status == 408) {
      this.alertProvider.presentToast(this.REQUEST_TIME_OUT);
      return;
    }
    if (err.status == 500) {
      this.alertProvider.presentToast(this.INTERNAL_SERVER);
      return;
    }
  }
}