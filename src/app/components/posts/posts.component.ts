import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Posts } from 'src/app/posts';
import { PostsService } from 'src/app/posts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AuthetificationService } from 'src/app/authetification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  openState = false;
  isLoading = false;

  pageLength = 0;
  pgSize = 2;
  options = [1, 2, 5, 10];
  currentPage = 1;

  isUserAuth;

  posts: Posts[] = [];

  postSubscription: Subscription;
  subject: Subscription;

  creatorID: string;

  loginName: string;

  private currentPageNum() {
    return this.currentPage;
  }

  private pageLengthNum() {
    return this.pageLength;
  }
  // @Input() posts;
  constructor(
    private postservice: PostsService,
    private router: Router,
    private auth: AuthetificationService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.postservice.getAllPost(this.pgSize, this.currentPage);
    this.postSubscription = this.postservice.getPostsSubject()
    .subscribe((data: {posts: Posts[], postCount: number}) => {
      this.isLoading = false;
      this.posts = data.posts;
      this.pageLength = data.postCount;
    });

    this.creatorID = this.auth.getCreatorId();
    this.loginName = this.auth.getCreatorName();
    this.isUserAuth = this.auth.getSubjectControl();
    this.subject = this.auth.getSubject()
    .subscribe( isAuth => {
       this.isUserAuth = isAuth;
       this.creatorID = this.auth.getCreatorId();
    });

  }

  onPage(e: PageEvent) {
    this.pgSize = e.pageSize;
    this.currentPage = e.pageIndex + 1;

    this.postservice.getAllPost(this.pgSize, this.currentPage);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.subject.unsubscribe();
  }

  onEdit(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  onCreate() {
    this.router.navigate(['/create']);
  }

  onDelete(id) {
   const length = this.pageLengthNum();
   const current = this.currentPageNum();
   if (length > 0) {
    this.postservice.delete(id)
    .subscribe(() => {
        this.postservice.getAllPost(this.pgSize, current);
        this.router.navigate(['/post']);
      });
   }
  }

}
