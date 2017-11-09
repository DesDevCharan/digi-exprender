import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpUtilService {

  constructor(private http: Http) { }

  postData(url, body): Observable<any> {
    return this.http.post(url, body).map((res: Response) => {

    }).catch((error: any) => {
      return Observable.of(false);
    });
  }
  getData(url) {
    return this.http.get(url).map((res: Response) => {
    }).catch((error: any) => {
      return Observable.of(false);
    });
  }

}
