import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MaterialModule } from './materials/material/material.module';
import { NavbarComponent } from './headerfooter/navbar/navbar.component';

import { RoutesModule } from './routing/routes/routes.module';
import { Interceptors } from './users/interceptor';
import { ErrorInterceptor } from './users/error-interceptors';
import { HandleErrorComponent } from './handle-error/handle-error.component';
import { PostModuleModule } from './components/post-module/post-module.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HandleErrorComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutesModule,
    PostModuleModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptors, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [HandleErrorComponent]
})
export class AppModule { }
