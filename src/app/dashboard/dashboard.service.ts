import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import {  Upload, NoteMaster } from './dashboard.model';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2'
import 'firebase/storage';


@Injectable()
export class DashboardService {

    noteList: AngularFireList<any>;
    private baseFileUploadPath: string = '/uploads';

    constructor(public firebaseApp: FirebaseApp, private http: HttpClient, private firebaseDB: AngularFireDatabase) {

    }

    getNoteList() {
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
            // SSID: hotspot.SSID,
            // latitude: hotspot.latitude,
            // longitude: hotspot.longitude,
            // name: hotspot.name,
            // tag: hotspot.tag
        });
    }

    addNoteData(noteData: NoteMaster) {
        if (noteData.noteType == "picture" || noteData.noteType == "document") {
            let upload = noteData.noteAttachment;
            let storageRef = this.firebaseApp.storage().ref().child(`${this.baseFileUploadPath}/${upload.file.name}`);

            storageRef.put(upload.file).then(snapshot => {
                console.log('successfully added', snapshot.downloadURL);
                upload.url = snapshot.downloadURL
                upload.name = upload.file.name
                this.addNewNote(noteData);
            }).catch(err => { console.error("Whoupsss!", err) })
        } else {
            this.addNewNote(noteData);
        }
    }

    pushUpload(upload: Upload) {
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(`${this.baseFileUploadPath}/${upload.file.name}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
                // upload in progress
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            (error) => {
                // upload failed
                console.log(error)
            },
            () => {
                // upload success
            }
        );
    }


    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
        this.firebaseDB.list(`${this.baseFileUploadPath}/`).push(upload);
    }

    deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then(() => {
                this.deleteFileStorage(upload.name)
            })
            .catch(error => console.log(error))
    }

    // Deletes the file details from the realtime db
    private deleteFileData(key: string) {
        return this.firebaseDB.list(`${this.baseFileUploadPath}/`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name: string) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.baseFileUploadPath}/${name}`).delete()
    }
}
