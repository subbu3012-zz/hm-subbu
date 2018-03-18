import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Upload, NoteMaster } from './dashboard.model';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    // animations: [routerTransition()],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-In' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },]
})
export class DashboardComponent implements OnInit {
    public noteList: NoteMaster[] = [];
    public uploadFile = new Upload();

    noteOptionList = ['Personal', 'Professional', 'Social', 'Optional'];
    selectedOptions = "";
    sliderValue: number = 1;
    emailFormControl = new FormControl('', []);
    newNoteField: string;

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(private ngZone: NgZone, private dashServ: DashboardService, public snackBar: MatSnackBar, private adapter: DateAdapter<any>) {

    }


    ngOnInit() {
        var x = this.dashServ.getNoteList();
        console.log('notelist', x)
        x.snapshotChanges().subscribe(item => {
            this.noteList = [];
            item.forEach(element => {
                var y = element.payload.toJSON();
                y["$key"] = element.key;
                this.noteList.unshift(y as NoteMaster)
                console.log(this.noteList)
            });
        });
    }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    public getLeftValue(index: number) {
        let _leftValue = '0vw';
        switch (index % 3) {
            case 1:
                _leftValue = '30vw'
                break;
            case 2:
                _leftValue = '60vw'
                break;
            default:
                break;
        }
        return _leftValue;
    }
}
