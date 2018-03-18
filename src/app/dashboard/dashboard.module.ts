import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { DashboardService } from './dashboard.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { NewNoteComponent } from './new-note/new-note.component'
import { NoteViwerComponent } from './note-viewer/note-viewer.component'


export const firebaseConfig = {
    apiKey: "AIzaSyBdA7sfuErWcOKwmtI-8lnLpr07N6f5Yug",
    authDomain: "subbu-work1.firebaseapp.com",
    databaseURL: "https://subbu-work1.firebaseio.com",
    projectId: "subbu-work1",
    storageBucket: "gs://subbu-work1.appspot.com",
    messagingSenderId: "461016956415"
};



@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule, // for database
        AngularFireAuthModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatCardModule, MatSnackBarModule,
        MatIconModule, MatDatepickerModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
        CommonModule,
        DashboardRoutingModule,
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatRadioModule,
        MatProgressBarModule, MatSelectModule
    ],
    declarations: [DashboardComponent, NewNoteComponent, NoteViwerComponent],
    providers: [DashboardService]
})
export class DashboardModule { }
