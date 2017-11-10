import { Network } from '@ionic-native/network';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkProvider {
  disconnectSubscription: any;

  constructor(private network: Network,
    private events: Events) {
    this.noConnection();
  }

  noConnection() {
    let checkNetworkConnection;
    //on disconnect
      this.disconnectSubscription =  this.network.onDisconnect().subscribe(data => {
      checkNetworkConnection = data.type;
      if (checkNetworkConnection == 'offline') {
        this.events.publish('noconnection', true);
      }
    }, error => {
    });
  }

  unsubscribeConnection() {
    this.disconnectSubscription.unsubscribe();
  }
}