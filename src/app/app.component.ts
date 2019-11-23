import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { BodyDirective } from './directives/body.directive';
import { LoginPageComponent } from './components/login-page/login-page.component';

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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoginPageComponent);
    const viewContainerRef = this.appBody.viewContainerRef;
    viewContainerRef.clear;
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

  showSignup() {
  }

}
