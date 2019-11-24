import { BodyComponent } from './../../interfaces/body-component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, BodyComponent {

  signupForm: FormGroup;
  matcher: ErrorStateMatcher;
  loading = false;

  constructor(private fb : FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.matcher = new MyErrorStateMatcher();
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      email:['', [Validators.required, Validators.email]]
    }, {validator: this.confirmPass});
  }

  signup() {
    this.loading = true;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  hasFormError = (errorName: string) => {
    return this.signupForm.hasError(errorName);
  }

  confirmPass(group: FormGroup) { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;

    return pass === confirmPass ? null : { passNotSame: true }     
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty);
    const invalidParent = !!(control && control.dirty && form && form.hasError("passNotSame"));

    return (invalidCtrl || invalidParent);
  }
}