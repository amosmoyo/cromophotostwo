import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/materials/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from '../create/create.component';
import { PostsComponent } from '../posts/posts.component';
import { EditComponent } from '../edit/edit.component';





@NgModule({
  declarations: [
    CreateComponent,
    PostsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PostModuleModule { }
