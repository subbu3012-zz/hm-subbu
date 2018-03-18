import { Component, AfterViewInit, Input, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { DashboardService } from './../dashboard.service';
import { NoteMaster, NoteTypeMaster, NOTETYPEMASTERDATA } from './../dashboard.model'

@Component({
	selector: 'app-note-viewer',
	templateUrl: './note-viewer.component.html',
	styleUrls: ['./note-viewer.component.scss'],
	// encapsulation: ViewEncapsulation.None,
	providers: []
})


export class NoteViwerComponent implements OnInit {
	@Input('noteData') note: NoteMaster;
	public noteTypeMasterData: NoteTypeMaster[] = NOTETYPEMASTERDATA;

	constructor(private dashBoardServ: DashboardService) {

	}

	ngOnInit() {

	}

	public getNoteBGColor(typeId: string) {
		return this.noteTypeMasterData.filter(note => note.typeId == typeId)[0].typeBGColor;
	}
}