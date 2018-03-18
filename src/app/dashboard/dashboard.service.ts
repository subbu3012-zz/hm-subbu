import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import { Upload, NoteMaster } from './dashboard.model';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2'
import { MatSnackBar } from '@angular/material';
import 'firebase/storage';


@Injectable()
export class DashboardService {

    public showProgressBar: boolean = false;
    noteList: AngularFireList<any>;
    private baseFileUploadPath: string = '/uploads';

    constructor(public snackBar: MatSnackBar, public firebaseApp: FirebaseApp, private http: HttpClient, private firebaseDB: AngularFireDatabase) {

    }

    getNoteList() {
        this.showProgressBar = true;
        setTimeout(() => {
            this.showProgressBar = false;
        }, 2000);
        this.noteList = this.firebaseDB.list('noteList/');
        return this.noteList;
    }

    addNewNote(note: NoteMaster) {
        this.noteList.push({
            noteType: note.noteType,
            noteTitle: note.noteTitle,
            noteDesc: note.noteDesc,
            noteAttachment: note.noteAttachment,
            noteCreatedDate: new Date().toDateString()
        });
        this.showProgressBar = false;
    }

    addNoteData(noteData: NoteMaster) {
        this.showProgressBar = true;
        if (noteData.noteType == "picture" || noteData.noteType == "document") {
            let upload = noteData.noteAttachment;
            let storageRef = this.firebaseApp.storage().ref().child(`${this.baseFileUploadPath}/${upload.file.name}`);

            storageRef.put(upload.file).then(snapshot => {
                upload.url = snapshot.downloadURL
                upload.name = upload.file.name
                this.addNewNote(noteData);
            }).catch(err => { console.error("Whoupsss!", err) })
        } else {
            this.addNewNote(noteData);
        }
    }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
