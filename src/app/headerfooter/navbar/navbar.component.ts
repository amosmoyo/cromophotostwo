import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthetificationService } from 'src/app/authetification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  title = 'Home';
  isUserAuth;
  subject: Subscription;

  constructor(
    private auth: AuthetificationService
  ) { }

  ngOnInit() {
    this.isUserAuth = this.auth.getSubjectControl();
    this.subject = this.auth.getSubject()
    .subscribe( isAuth => {
      this.isUserAuth = isAuth;
    });
  }

  onLogout() {
    this.auth.logout();
  }
  ngOnDestroy() {
    this.subject.unsubscribe();
  }

}
