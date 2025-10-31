import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { FormFiled } from '../../../types/field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-field',
  imports: [MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './date-field.html',
  styleUrl: './date-field.scss'
})
export class DateField {
  field = input.required<FormFiled>();
}
