import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CLIENT_KEY, CARING_CONNECT_BASE_URL, PRIVATE_KEY, BRAND_ID } from '../../config';
import { Observable } from 'rxjs/Observable';
import { REFRESH_TOKEN } from '../../url';
import { Device } from '@ionic-native/device';
import { LoaderProvider } from '../loader/loader';
import { AuthProvider } from '../auth/auth';
import NODERSA from 'node-rsa';
import * as jwe from 'node-webtokens';

@Injectable()
export class ConnectAuthProvider {
  public deviceId: string = null;
  public devicePlatform: string = null;
  public _headers: Headers = new Headers();
  public refreshKey: string = null;
  public retryCount: number = 0;

  constructor(public http: Http, private device: Device, private platform: Platform, private loader: LoaderProvider, private authProvider: AuthProvider) {
    console.log('Hello ConnectAuthProvider Provider');
    this.platform.ready().then(() => {
      this.deviceId = (this.device.uuid) ? this.device.uuid : '';
      this.devicePlatform = (this.device.platform) ? this.device.platform : '';
      this._headers.append('Content-Type', 'application/json');
      this._headers.append('Accept', 'application/json');
    })
  }

  // Method to Validate the Token.
  public async validateToken(token) {
    if (token) {
      let parsedToken = await this.getUserParsedToken(token);
      console.log(parsedToken, "parsedToken")
      if (parsedToken.valid) {
        this.retryCount = 0;
        return true;
      } else {
        this.retryCount++;
        if (this.retryCount < 3) {
          let res = await this.checkToken(parsedToken);
          await res.subscribe(refreshedToken => {
            this.validateToken(refreshedToken);
            return;
          }, err => {
            return false
          })
        } else {
          console.log("false from count");
          return false;
        }
      }
    } else {
      return false;
    }
  }

  private async checkToken(parsedToken) {
    const refreshKey = parsedToken.payload.refresh_key;
    let refreshData = await this.refreshToken(refreshKey);
    return refreshData;
  }

  // API to fetch the Refresh Token by using Refresh Token API of Caring Connect.
  private refreshToken(refreshKey): Observable<any> {
    let URL = `${CARING_CONNECT_BASE_URL}${REFRESH_TOKEN}`;
    let body = {
      refresh_key: refreshKey,
      session_id: this.authProvider.getSession(),
      target_client_code: CLIENT_KEY
    }
    console.log(body,':::::::::::::::::::RefreshKey Data:::::::::::::::::::::::::::;;;;;')
    this._headers.append('x-user-token', this.authProvider.getAuthToken());
    this._headers.append('client_code', CLIENT_KEY);
    return this.http.post(URL, body, { headers: this._headers })
      .do((res: Response) => res)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw(err))
      .finally(() => this.loader.dismissLoader())
  }

  /**
   * To get mobile no from token
   * @param token - Token contains payload
   */
  public async getUserMobileNo(token) {
    let parsedToken = await this.getUserParsedToken(token);
    return parsedToken.payload.phonenumber;
  }

  /**
   * To decrypt a raw token
   * @param token - Raw Token
   */
  private async getUserParsedToken(token) {
    let keys = new NODERSA(PRIVATE_KEY);
    let pKey = await keys.exportKey('pkcs1-private-pem');
    // .setTokenLifetime(60)
    let parsedToken = await jwe.parse(token).verify(pKey);
    return parsedToken;
  }
}