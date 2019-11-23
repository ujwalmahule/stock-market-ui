import { BodyComponent } from './interfaces/body-component';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { BodyDirective } from './directives/body.directive';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-market-ui';
  @ViewChild(BodyDirective, {static : true}) appBody: BodyDirective;

  constructor(private componentFactoryResolver : ComponentFactoryResolver) { }

  showLogin() {
    this.showComponentAppBody(LoginPageComponent);
  }

  showSignup() {
    this.showComponentAppBody(SignupPageComponent);
  }
  
  showComponentAppBody(component : BodyComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>component);
    const viewContainerRef = this.appBody.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
