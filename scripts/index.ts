export class Index {

    constructor(version: number, files: FileMeta[]) {
        this.index_version = version;
        this.files = files;
    }

    index_version: number;
    files: FileMeta[];

    toJSON() {
        return {
            "index-version": this.index_version,
            "files": this.files
        };
    }
}

export interface FileMeta {
    filename: string;
    resourceType: string;
    id: string | undefined;
    version: string | undefined;
    url: string | undefined;
    kind: string | undefined;
    type: string | undefined;
}
