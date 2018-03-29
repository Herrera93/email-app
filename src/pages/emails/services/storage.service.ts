import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class StorageService {

    uploadPercent: Observable<number>;

    constructor(private storage: AngularFireStorage) {
    }

    uploadFileToEmail(file: File) {
        let filePath = file.name;

        return fromPromise(this.uploadFile(file, filePath).then());
    }

    uploadFile(file, filePath) {
        return this.storage.upload(filePath, file);
    }

    loadMetadata(filePath: string) {
        return this.storage.ref(filePath).getMetadata();
    }
}
