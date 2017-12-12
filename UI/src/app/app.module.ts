import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthenticateService } from './authenticate.service';
import { G28FormComponent } from './g28-form/g28-form.component';

const appRoutes: Routes = [
  { path: 'form', component: G28FormComponent },
  { path: '', component: LoginFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    G28FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
