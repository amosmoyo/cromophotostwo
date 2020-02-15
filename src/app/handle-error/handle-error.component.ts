import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-handle-error',
  templateUrl: './handle-error.component.html',
  styleUrls: ['./handle-error.component.css']
})
export class HandleErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }

}
