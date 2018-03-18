import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
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
        MatInputModule, MatButtonModule, MatSnackBarModule, MatIconModule,
        CommonModule,
        DashboardRoutingModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule
    ],
    declarations: [DashboardComponent, NewNoteComponent, NoteViwerComponent],
    providers: [DashboardService]
})
export class DashboardModule { }
