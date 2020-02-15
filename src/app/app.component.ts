import { Component, OnInit } from '@angular/core';
import { Posts } from './posts';
import { AuthetificationService } from './authetification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'projectThree';

  posts: Posts[] = [];

  constructor(
    private auth: AuthetificationService
  ) {}

  ngOnInit() {
    this.auth.autoAutheticate();
  }

  onEmitValue(data) {
    this.posts.push(data);
  }
}
