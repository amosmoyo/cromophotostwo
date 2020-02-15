import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../environments/environment';

const url = environment.url + '/posts';

@Injectable({
  providedIn: 'root'
})
export class AuthetificationService {

  private token: string;
  private tokenTimer;

  private subject = new Subject<boolean>();
  private subjectControl = false;

  private creatorID: string;

  private creatorName: string;

  getSubject() {
    return this.subject.asObservable();
  }

  getSubjectControl() {
    return this.subjectControl;
  }

  getToken() {
    return this.token;
  }

  getCreatorId() {
    return this.creatorID;
  }

  getCreatorName() {
    return this.creatorName;
  }


  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  signup(signup: object) {
    this.http.post<{message: string, document: any}>(`${url}/signup`, signup)
    .subscribe(response => {
      this.snackBar.open('Your account was successfully created.You can login.', 'OK', {duration: 5000});
    }, error => {
      console.log('This is the error', error);
    });
  }

  login(login: object) {

    this.http.post<{token: string, expiresIn: number, creatorId: string, creatorName: string}>(`${url}/login`, login)
    .subscribe( response => {
      const token = response.token;

      const expiryTime = response.expiresIn;
      const now = new Date();
      const expiryDate = new Date(now.getTime() + (expiryTime * 1000));
      if (token) {
        console.log(token);
        this.token = token;
        this.creatorID = response.creatorId;
        this.creatorName = response.creatorName;
       /* this.tokenTimer = setTimeout(() => {
            this.logout();
        }, expiryTime);*/
        this.setAuthData(token, expiryDate, this.creatorID, this.creatorName);
        this.reset(expiryTime * 1000);
        this.subjectControl = true;
        this.subject.next(true);

        this.router.navigate(['/post']);
      }
    }, error => {
      console.log(error);
    } );

  }

  autoAutheticate() {
    const tokenInfo = this.getAuthData();
    if (!tokenInfo) {
      return;
    }
    const now = new Date();
    const expiresIn =  tokenInfo.expiryDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = tokenInfo.token;
      this.reset(expiresIn);
      this.creatorID = tokenInfo.creatorID;
      this.creatorName = tokenInfo.creatorName;
      this.subjectControl = true;
      this.subject.next(true);
    }
  }

  reset(data: number) {
    setTimeout(() => {
      this.logout();
    }, data);
  }

  logout() {
    this.token = null;
    this.subjectControl = false;
    this.subject.next(false);
    this.creatorID = null;

    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // localstorage
  // set data
  private setAuthData(token: string, expiryDate, creatorID, creatorName) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiry', expiryDate);
    localStorage.setItem('creatorId', creatorID);
    localStorage.setItem('creatorName', creatorName);
  }

  // clear data
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('creatorId');
    localStorage.removeItem('creatorName');
  }

  // get items
  private getAuthData() {
    const tokenData = localStorage.getItem('token');
    const expiryData = localStorage.getItem('expiry');
    const creatorIdData = localStorage.getItem('creatorId');
    const name = localStorage.getItem('creatorName');

    if (! tokenData || ! expiryData) {
      return;
    }

    return {
      token: tokenData,
      expiryDate: new Date(expiryData),
      creatorID: creatorIdData,
      creatorName: name
    };
  }
}
