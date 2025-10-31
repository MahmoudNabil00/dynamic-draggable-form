import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormFiled } from '../../../types/field';

@Component({
  selector: 'app-select-field',
  imports: [MatSelectModule,FormsModule, MatFormFieldModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss'
})
export class SelectField {
  field = input.required<FormFiled>();
}
