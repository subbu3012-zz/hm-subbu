export class Upload {

    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();
}

export class NoteMaster {
    noteType: string;
    noteTitle?: string = null;
    noteDesc: string = "";
    noteAttachment?: Upload = new Upload();
    noteCreatedDate: Date = new Date();
}

export class FileExtensionInfo {
    status: string;
    text: string;
}

export class NoteTypeMaster {
    typeId: string;
    typeDesc: string;
    typeBGColor: string;
}

export const NOTETYPEMASTERDATA: NoteTypeMaster[] = [
    {
        "typeId": "text",
        "typeDesc": "Text",
        "typeBGColor": "#d7e8c0"
    },
    {
        "typeId": "article",
        "typeDesc": "Article",
        "typeBGColor": "#f5aca9"
    },
    {
        "typeId": "picture",
        "typeDesc": "Picture",
        "typeBGColor": "#fff1b3"
    },
    {
        "typeId": "document",
        "typeDesc": "Document",
        "typeBGColor": "#cff4f8"
    }
]