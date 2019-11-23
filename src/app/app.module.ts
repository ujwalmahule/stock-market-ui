import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BodyDirective } from './directives/body.directive';
import { SignupPageComponent } from './components/signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoginPageComponent,
    BodyDirective,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  entryComponents: [AppComponent, LoginPageComponent, SignupPageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
