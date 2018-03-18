import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Upload, NoteMaster } from './dashboard.model';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    // animations: [routerTransition()],
    providers: []
})
export class DashboardComponent implements OnInit {
    public noteList: NoteMaster[] = [];
    public uploadFile = new Upload();

    constructor(public dashServ: DashboardService) {

    }

    ngOnInit() {
        var x = this.dashServ.getNoteList();
        x.snapshotChanges().subscribe(item => {
            this.noteList = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.noteList.unshift(y as NoteMaster)
            });
        });
    }
}
