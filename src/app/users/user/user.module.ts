import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/materials/material/material.module';
import { UserRoutingModule } from '../user-routing/user-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UserRoutingModule
  ]
})
export class UserModule { }
