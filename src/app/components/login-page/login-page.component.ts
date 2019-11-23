import { BodyComponent } from './../../interfaces/body-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, BodyComponent {

  constructor() { }

  ngOnInit() {
  }

}
