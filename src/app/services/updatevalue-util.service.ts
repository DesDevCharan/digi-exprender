// IMPORTS
import { Injectable, EventEmitter } from '@angular/core';

// INJECTION
@Injectable()

// SERVICE EXPORT
export class UpdateService {

  private dataCollection: any;
  public fbDataUpdated = new EventEmitter();


  updateFactors(data) {
    this.dataCollection = data;
    this.fbDataUpdated.emit(this.dataCollection);
  }
}
