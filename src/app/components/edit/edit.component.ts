import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from 'src/app/posts.service';
import { mimetypeValidators } from '../create/mimetype.validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  post;
  postId;
  imageUrl;
  url;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postservice: PostsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      if (param.has('id')) {
         this.postId = param.get('id');
      }
    });

    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required]],
      image: [null, [Validators.required], mimetypeValidators]
    });

    this.postservice.getOnePost(this.postId)
    .subscribe(responce => {
      this.post = {
        id: responce.document._id,
        title: responce.document.title,
        description: responce.document.description,
        imagePath: responce.document.imagePath
      };

      this.editForm.setValue({
        title: this.post.title,
        description: this.post.description,
        image: this.post.imagePath
      });

      this.imageUrl = this.post.imagePath;

    });


  }

  get title() { return this.editForm.get('title'); }

  get description() { return this.editForm.get('description'); }

  onUploadImg(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.editForm.patchValue({image: file});
    this.editForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageUrl = reader.result;
    });
    reader.readAsDataURL(file);
  }

  onEdit() {
    if (this.editForm.invalid) {
      return;
    }
    this.postservice.update(
      this.postId,
      this.editForm.value.title,
      this.editForm.value.description,
      this.editForm.value.image
    );

    this.editForm.reset();
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.controls[key].setErrors(null);
    });
  }

}
