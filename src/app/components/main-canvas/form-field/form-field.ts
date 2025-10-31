import { Component, computed, inject, input } from '@angular/core';
import { FormFiled } from '../../../types/field';
import { FieldTypesService } from '../../../services/field-types.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../services/form.service';
import { FormRow } from '../../../types/form';
@Component({
  selector: 'app-form-field',
  imports: [NgComponentOutlet,CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss'
})
export class FormField {
  field = input.required<FormFiled>();
  row = input<FormRow>()
  formService = inject(FormService);
  fieldTypeService = inject(FieldTypesService);

  previewComponent = computed(()=>{
    return this.fieldTypeService.getFieldType(this.field().type).component ?? null;
  })
  
  deleteField(e:Event){
    e.stopPropagation();
    this.formService.deleteField(this.field().id,this.row()?.id)
  }
  selectField(){
    this.formService.setSelectedField(this.field().id);
  }
}
