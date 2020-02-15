import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthetificationService } from 'src/app/authetification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  constructor(
    private auth: AuthetificationService
  ) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form.value.name, form.value.email, form.value.password);

    const signup = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    };
    this.isLoading = true;
    this.auth.signup(signup);
    form.resetForm();
  }

}
