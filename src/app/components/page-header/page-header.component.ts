import { Component, OnInit, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { BodyDirective } from 'src/app/directives/body.directive';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  @Output() loginClick: EventEmitter<any> = new EventEmitter();

  showLogin() {
    this.loginClick.emit(null);
  }
}
