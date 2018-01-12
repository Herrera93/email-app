import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Email } from '../../models/email.model';
import * as fromEmails from '../../reducers';
import * as fromAuth from '../../../auth/reducers'
import * as emails from '../../actions/email.actions';
import * as storage from '../../actions/storage.actions';

import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-compose-page',
  templateUrl: './compose-email-page.component.html',
  styles: [`
    .composeContainer {
        height: 100%;
        width: 100%;
    }
  `],
})
export class ComposeEmailPageComponent implements OnInit {

  constructor(private store: Store<fromEmails.State>) { }

  ngOnInit() { }

  onSubmit($event: Email) {
    let videoCounter = 0;
    let email = Object.assign({}, $event);
    email.message.forEach(element => {
      if (element.hasOwnProperty('insert') && element.insert.hasOwnProperty('rtc')) {
        let fileName = this.getFileName('webm');
        let fileObject = new File([element.insert.rtc], fileName, {
          type: 'video/webm'
        });
        this.store.dispatch(new storage.UploadFile(fileObject));
        videoCounter++;
      }
    });

    let subVideoCounter = 0;
    this.store
      .select(fromEmails.getStorageFileURL)
      .merge(this.store.select(fromAuth.getUser))
      .subscribe((val) => {
        if (typeof val === 'string') {
          email.message = email.message.map(op => {
            if (op.hasOwnProperty('insert') &&
              op.insert.hasOwnProperty('rtc') &&
              op.insert.rtc instanceof Blob
            ) {
              op.insert.rtc = val;
              subVideoCounter++;
            }
            return op;
          });
        } else {
          email.from = val;
        }

        if (subVideoCounter === videoCounter && email.from !== null) {
          this.store.dispatch(new emails.SendEmail(email));
        }
      });
  }

  // this function is used to generate random file name
  private getFileName(fileExtension) {
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var date = d.getUTCDate();
    return 'video-' + year + month + date + '-' + this.getRandomString() + '.' + fileExtension;
  }

  private getRandomString() {
    return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
  }
}
