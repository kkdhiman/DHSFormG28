import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthenticateService } from './authenticate.service';
import { ConfigService } from './config.service';
import { G28FormComponent } from './g28-form/g28-form.component';
import { Part1Component } from './g28-form/part-1/part-1.component';
import { Part2Component } from './g28-form/part-2/part-2.component';
import { Part3Component } from './g28-form/part-3/part-3.component';
import { Part4Component } from './g28-form/part-4/part-4.component';
import { Part5Component } from './g28-form/part-5/part-5.component';
import { Part6Component } from './g28-form/part-6/part-6.component';

const appRoutes: Routes = [
  { path: 'form', component: G28FormComponent },
  { path: '', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LogoutComponent,
    G28FormComponent,
    Part1Component,
    Part2Component,
    Part3Component,
    Part4Component,
    Part5Component,
    Part6Component
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ui'}),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticateService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
