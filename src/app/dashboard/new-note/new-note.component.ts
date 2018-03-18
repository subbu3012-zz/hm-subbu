import { Component, AfterViewInit, Input, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { DashboardService } from './../dashboard.service';
import { NoteMaster, FileExtensionInfo, NoteTypeMaster, NOTETYPEMASTERDATA } from './../dashboard.model'

@Component({
	selector: 'app-new-note',
	templateUrl: './new-note.component.html',
	styleUrls: ['./new-note.component.scss'],
	// encapsulation: ViewEncapsulation.None,
	providers: []
})


export class NewNoteComponent implements OnInit {

	public uploadFileState: FileExtensionInfo = new FileExtensionInfo();
	public noteUploadFile: File;
	@ViewChild('uploadFile') uploadFile: any;
	allowedFileExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.txt|\.doc|\.xls|\.csv|\.pdf|\.ODF)$/i;
	allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;

	public newNote = new NoteMaster();
	public noteTypeMasterData: NoteTypeMaster[] = NOTETYPEMASTERDATA;
	constructor(private dashBoardServ: DashboardService) {

	}

	ngOnInit() {

	}

	public fileChangeEvent(fileInput: any, pastedInput: File) { // fileInput: Manually Upload File, pastedInput: Paste File
		if (fileInput) {
			this.noteUploadFile = fileInput.target.files[0];
		} else if (pastedInput) {
			this.noteUploadFile = pastedInput;
		} else {
			return;
		}
		if (!this.noteUploadFile) {
			this.resetuploadFile();
			return;
		}
		this.fileValidation();
	}

	public fileValidation() {
		/**Maintain allowed Extensions separately */
		if (!this.allowedFileExtensions.exec(this.noteUploadFile.name)) {
			this.resetuploadFile();
			this.uploadFileState.text = "Extension not allowed";
			this.uploadFileState.status = "error";
		}
		else {
			this.uploadFileState.text = this.noteUploadFile.name;
			this.uploadFileState.status = "default";
			this.newNote.noteAttachment.file = this.noteUploadFile;
		}
	}

	public prepareAttachmentForUpload() {
		if (this.noteUploadFile && this.allowedFileExtensions.exec(this.noteUploadFile.name)) {

		}
	}

	public resetuploadFile() {
		this.uploadFile.nativeElement.value = "";
		this.uploadFileState.text = "";
		this.uploadFileState.status = "default";
		this.noteUploadFile = null;
	}

	public addNewNote() {
		console.log('this.newNote', this.newNote);
		this.setNoteType();
		this.dashBoardServ.addNoteData(this.newNote);
		this.newNote = new NoteMaster();
		this.noteUploadFile = null;
		this.uploadFileState = new FileExtensionInfo();
	}

	public setNoteType() {
		if (this.newNote.noteDesc) {
			if (this.newNote.noteTitle) {
				if (this.newNote.noteAttachment.file) {
					if (this.allowedImageExtensions.exec(this.newNote.noteAttachment.file.name)) {
						this.newNote.noteType = "picture";
					} else {
						this.newNote.noteType = "document";
					}
				} else {
					this.newNote.noteType = "article";
				}
			} else {
				this.newNote.noteType = "text";
			}
		} else {
			this.newNote.noteType = "invalid";
		}
	}
}