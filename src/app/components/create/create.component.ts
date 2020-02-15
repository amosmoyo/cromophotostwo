import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/posts.service';
import { mimetypeValidators } from './mimetype.validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  postForm: FormGroup;

  imageUrl;

  // tslint:disable-next-line: no-output-on-prefix
  // @Output() onEmit = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private postservice: PostsService
  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
      image: [null, [Validators.required], mimetypeValidators]
    });
  }

  get title() { return this.postForm.get('title'); }

  get description() { return this.postForm.get('description'); }

  onUploadImg(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image: file});
    this.postForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageUrl = reader.result;
    });
    reader.readAsDataURL(file);
  }

  onClick() {
    if (this.postForm.invalid) {
      return;
    }
    const post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
      image: this.postForm.value.image
    };

    // this.onEmit.emit(post);

    this.postservice.post(post.title, post.description, post.image);
    this.postForm.reset();

    Object.keys(this.postForm.controls).forEach(key => {
      this.postForm.controls[key].setErrors(null);
    });
  }

}
