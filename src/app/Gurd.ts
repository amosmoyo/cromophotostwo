import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthetificationService } from './authetification.service';
import { PostsService } from './posts.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGurds implements CanActivate {
  constructor(
    private auth: AuthetificationService,
    private router: Router
    ) {
  }
  // tslint:disable-next-line: max-line-length
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isUserAuth = this.auth.getSubjectControl();
    if (!isUserAuth) {
      this.router.navigate(['/auth/login']);
    }

    return isUserAuth;
  }
}
