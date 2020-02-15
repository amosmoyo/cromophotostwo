import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { EditComponent } from 'src/app/components/edit/edit.component';
import { CreateComponent } from 'src/app/components/create/create.component';
import { AuthGurds } from 'src/app/Gurd';
import { UserModule } from 'src/app/users/user/user.module';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AboutComponent } from 'src/app/components/about/about.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'post', component: PostsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGurds]},
  {path: 'create', component: CreateComponent, canActivate: [AuthGurds]},
  {path: 'auth', loadChildren: 'src/app/users/user/user.module#UserModule'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGurds,
  ]
})
export class RoutesModule { }
