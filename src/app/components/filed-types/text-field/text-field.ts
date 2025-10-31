import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormFiled } from '../../../types/field';

@Component({
  selector: 'app-text-field',
  imports: [MatFormFieldModule,MatInputModule],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss'
})
export class TextField {
  field = input.required<FormFiled>();
}
