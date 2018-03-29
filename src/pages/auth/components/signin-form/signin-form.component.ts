import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authenticate } from '../../models/user.model';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
})
export class SigninFormComponent implements OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<Authenticate>();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

}
