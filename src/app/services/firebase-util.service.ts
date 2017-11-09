import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

// INJECTION
@Injectable()

// SERVICE EXPORT
export class MyDayService {
  // VARIABLES
  apiRef = '2017-10-26';

  // CONSTRUCTOR
  constructor(
    private firebaseService: AngularFireDatabase
  ) { }

  // Get saved events
  getCurrentData() {

    const fbURL = '/impressions/' + this.apiRef;
    const observable = new Observable(observer => {
      this.firebaseService.list(fbURL).valueChanges().subscribe((rt) => {
        observer.next(rt);
      });
    });
    return observable;
  }
}
