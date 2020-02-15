import { Injectable } from '@angular/core';
import { Posts } from './posts';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';


const url = environment.url + '/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Posts[] = [];

  maxCount;

  postSubject = new Subject<{posts: Posts[], postCount: number}>();

  getPostsSubject() {
    return this.postSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  // craete operations
  post(tit: string, des: string, img: File) {
   const postForm = new FormData();

   postForm.append('title', tit);
   postForm.append('description', des);
   postForm.append('image', img, tit);

   this.http.post<{message: string, document: any}>(`${url}`, postForm)
   .subscribe(responceData => {
     // this.posts.push(responceData.document);
    // this.postSubject.next({posts: Posts[], postCount: number});
     this.router.navigate(['/post']);
   });
  }

  // read operation
  getAllPost(pgSize: number, currentPage: number ) {
    this.http.get<{message: string, documents: any, maxCount: number}>
    (`${url}?pagesize=${pgSize}&page=${currentPage}`)
    .pipe(
      map(response => {
        return {posts: response.documents.map(x => {
          return {
            id: x._id,
            title: x.title,
            description: x.description,
            imagePath: x.imagePath,
            creatorId: x.creatorId,
            creatorName: x.creatorName
          };
        }), count: response.maxCount};
      })
    )
    .subscribe(dataResponce => {
      this.posts = dataResponce.posts;
      this.maxCount = dataResponce.count;
      this.postSubject.next({posts: [...this.posts], postCount: dataResponce.count});
    });
  }

  // read operations
  getOnePost(id) {
    return this.http.get<{message: string, document: any}>(`${url}/${id}`);
  }

  // update operation
  update(Id: string, tit: string, des: string, img: File | string) {
    let postForm;
    if (typeof(img) === 'object') {
      postForm = new FormData();
      postForm.append('id', Id);
      postForm.append('title', tit);
      postForm.append('description', des);
      postForm.append('image', img, tit);
    } else {
      postForm = {
        id: Id,
        title: tit,
        description: des,
        imagePath: img
      };
    }

    this.http.post<{message: string, document: any}>(`${url}/update/${Id}`, postForm)
    .subscribe((responce) => {
     /* const newPost = [...this.posts];
      const indx = newPost.findIndex(x => x.id === responce.document._id);
      newPost[indx] = {
        id: responce.document._id,
        title: tit,
        description: des,
        imagePath: responce.document.imagePath
      };
      this.posts = newPost;
      this.postSubject.next([...this.posts]);
     */
      this.router.navigate(['/post']);

    });
  }

  getCount() {
    return this.maxCount;
  }

  // delete operations
  delete(id) {
    return this.http.get(`${url}/delete/${id}`);
    /*.subscribe((response) => {
      const newPost = [...this.posts];
      const postRemain = newPost.filter(x => x.id !== id);
      this.posts = postRemain;
      const count = this.getCount();
      this.postSubject.next({posts: [...this.posts], postCount: count});
    });*/
  }

}
