import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-email-search',
  templateUrl: 'email-search.component.html'
})
export class EmailSearchComponent {
  @Input() query = '';
  @Input() searching = false;
  @Output() search = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    val: new FormControl('')
  });
}
