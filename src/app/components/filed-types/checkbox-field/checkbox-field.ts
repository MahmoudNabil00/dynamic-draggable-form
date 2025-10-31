import { Component, input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormFiled } from '../../../types/field';

@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckboxModule],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss'
})
export class CheckboxField {
  field = input.required<FormFiled>();
}
