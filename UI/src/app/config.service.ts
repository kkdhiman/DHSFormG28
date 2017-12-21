import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {

  CONFIG = {};

  constructor(private http: HttpClient) { }

  getEnvConfig() {
    const configUrl = window.location.protocol + '//' + window.location.hostname + ':3000';
    console.log('ConfigURL ==> ' + configUrl);

    const promise = new Promise((resolve, reject) => {
      this.http.get(configUrl)
        .toPromise()
        .then(
          res => { // Success
            console.log(JSON.stringify(res));
            this.CONFIG = res;
            resolve();
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
    return promise.then(() => {
      return this.CONFIG;
    });
  }
}
