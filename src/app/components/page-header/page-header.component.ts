import { Component, OnInit, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { BodyDirective } from 'src/app/directives/body.directive';
import { User } from 'src/app/auth/model/user';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    
  }

  @Output() loginClick: EventEmitter<any> = new EventEmitter();
  @Output() signupClick: EventEmitter<any> = new EventEmitter();

  showLogin() {
    this.loginClick.emit(null);
  }

  showSignup() {
    this.signupClick.emit(null);
  }

  doLogout() {
    console.log("logout called")
    this.authenticationService.logout();
  }
}
