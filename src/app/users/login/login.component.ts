import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthetificationService } from 'src/app/authetification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthetificationService
  ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const login = {
      email: form.value.email,
      password: form.value.password,
      name: null
    };

    this.auth.login(login);
    form.resetForm();
  }

}
