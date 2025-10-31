import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FieldTypesService } from '../../services/field-types.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicOptions } from "./dynamic-options/dynamic-options";

@Component({
  selector: 'app-field-settings',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, MatCheckboxModule, DynamicOptions],
  templateUrl: './field-settings.html',
  styleUrl: './field-settings.scss'
})
export class FieldSettings {
  formService = inject(FormService);
  fieldTypesService = inject(FieldTypesService);
  fieldSettings = computed(()=>{
    const field = this.formService.selectedField();
    if(!field){
      return [];
    }
    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    return fieldDef?.settingsConfig ?? [];
  })

  fieldValues = computed(()=>{
    const field = this.formService.selectedField();
    if(!field){
      return {};
    }
    return field as any; 
  })
  updateField(fieldId:string, key:string, value:any){
    this.formService.updateField(fieldId, {[key]:value});
  }
}
