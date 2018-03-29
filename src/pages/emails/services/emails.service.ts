import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { Email } from '../models/email.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class EmailsService {

    private emailCollection: AngularFirestoreCollection<Email>;

    constructor(private afs: AngularFirestore) {
        this.emailCollection = afs.collection<Email>('emails');
    }

    sendEmail(email: Email) {
        return fromPromise(this.emailCollection.add(email));
    }

    loadEmails(email: string, skip = 0, limit = 50, lastRef?: string, firstRef?: string) {
        return this.afs.collection('emails', ref => {
                let query: firebase.firestore.Query = ref.where('to', '==', email);
                if (lastRef) { // next page
                    query = query.orderBy('date', 'desc').startAfter(lastRef).limit(limit);
                } else if (firstRef) { // previous page
                    query = query.orderBy('date').startAfter(firstRef).limit(limit);
                } else { // first page 
                    query = query.orderBy('date', 'desc').limit(limit);
                }
                return query;
            })
            .snapshotChanges()
            .map(actions => {
                return actions.map(action => <Email>({ uid: action.payload.doc.id, ...action.payload.doc.data() }));
            });
    }
}
