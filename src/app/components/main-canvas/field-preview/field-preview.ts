import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-field-preview',
  imports: [CommonModule],
  templateUrl: './field-preview.html',
  styleUrl: './field-preview.scss'
})
export class FieldPreview extends FormField{
  constructor(){
    super()
  }
}
