import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpGenderComponent } from './components/exp-gender/exp-gender.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { ContentAreaComponent } from './components/content-area/content-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDayService } from  './services/firebase-util.service';
import { UpdateService } from  './services/updatevalue-util.service';

import {
  MatButtonModule, MatDatepickerModule,
  MatInputModule, MatNativeDateModule } from '@angular/material';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { DateAdapter as MyDateAdapter, MY_DATE_FORMATS } from './utils/date-adapter';
import { HttpUtilService} from './services/http-util.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ExpGenderComponent,
    LeftPanelComponent,
    ContentAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule
    // ChartModule,
  ],
  providers: [
    MyDayService,
    UpdateService,
    { provide: DateAdapter, useClass: MyDateAdapter },
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    HttpUtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
