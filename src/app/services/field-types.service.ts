import { Injectable } from '@angular/core';
import { FieldTypeDefinition, FormFiled } from '../types/field';
import { TextField } from '../components/filed-types/text-field/text-field';
import { CheckboxField } from '../components/filed-types/checkbox-field/checkbox-field';
import { SelectField } from '../components/filed-types/select-field/select-field';
import { DateField } from '../components/filed-types/date-field/date-field';

const TEXT_FIELD_DEFINITION:FieldTypeDefinition = {
  type:'text',
  label:'Text Field',
  icon:'text_fields',
  defaultConfig:{
    placeholder:'Enter text',
    required:false,
    label:'Text Field',
  },
  settingsConfig:[
    {
      type:'text',
      key:'label',
      label:'label',
    },
    {
      type:'text',
      key:'placeholder',
      label:'Placeholder',
    },
    {
      type:'checkbox',
      key:'required',
      label:'Required',
    },
    {
      type:'select',
      key:'inputType',
      label:'Input Type',
      options:[
        {label:'Text',value:'text'},
        {label:'Number',value:'number'},
        {label:'Email',value:'email'},
        {label:'Password',value:'password'},
      ],
    },
  ],
  component:TextField,
  generateCode:(field:FormFiled)=>{
    return ( `
    <mat-form-field class="w-full">
      <mat-label>${field.label}</mat-label>
      <input matInput type="${field.inputType || 'text'}" placeholder="${field.placeholder || ''}" required="${field.required}" />
    </mat-form-field>
    `
    )
  }
}

const CHECKBOX_FIELD_DEFINITION:FieldTypeDefinition = {
  type:'checkbox',
  label:'Checkbox',
  icon:'check_box',
  defaultConfig:{
    label:'Checkbox',
    required:false,
  },
  settingsConfig:[
    {
      type:'text',
      key:'label',
      label:'label',
    },
    {
      type:'checkbox',
      key:'required',
      label:'Required',
    },
  ],
  component:CheckboxField,
  generateCode:(field:FormFiled)=>{
    return ( `
    <mat-checkbox label="${field.label}" required="${field.required}" />
    `
    )
  }
}

const SELECT_FIELD_DEFINITION:FieldTypeDefinition = {
  type:'select',
  label:'Select Field',
  icon:'arrow_drop_down_circle',
  defaultConfig:{
    label:'Select Field',
    required:false,
    options:[
      {label:'Option 1',value:'option1'},
      {label:'Option 2',value:'option2'},
      {label:'Option 3',value:'option3'},
    ],
  },
  settingsConfig:[
    {
      type:'text',
      key:'label',
      label:'label',
    },
    {
      type:'checkbox',
      key:'required',
      label:'Required',
    },
    {
      type:'dynamic-options',
      key:'options',
      label:'Options',
    },
  ],
  component:SelectField,
  generateCode:(field:FormFiled)=>{
    let code = `
      <mat-form-field class="w-full"> \n` +
      `    <mat-label>${field.label}</mat-label> \n` +
      `    <mat-select [required]="${field.required}"> \n`
      if(field.options){
        for(let option of field.options){
          code += `    <mat-option [value]="${option.value}">${option.label}</mat-option> \n`
        }
      }else{
        code += `    <mat-option [value]="null">No options</mat-option> \n`
      }
      code += `    </mat-select> \n` +
      `</mat-form-field> \n`
      return code;
  }
}

const DATE_FIELD_DEFINITION:FieldTypeDefinition = {
  type:'date',
  label:'Date Field',
  icon:'calendar_today',
  defaultConfig:{
    label:'Date Field',
    required:false,
  },
  component:DateField,
  settingsConfig:[
    {
      type:'text',
      key:'label',
      label:'label',
    },
    {
      type:'checkbox',
      key:'required',
      label:'Required',
    },
  ],
  generateCode:(field:FormFiled)=>{
    return ( `
    <mat-form-field class="w-full">
      <mat-label>${field.label}</mat-label>
      <input matInput [matDatepicker]="picker${field.id}" [required]="${field.required}" />
      <mat-datepicker-toggle matSuffix [for]="picker${field.id}"></mat-datepicker-toggle>
      <mat-datepicker #picker${field.id}></mat-datepicker>
    </mat-form-field>
    `)
  }
}
@Injectable({
  providedIn: 'root'
})
export class FieldTypesService {
  fieldTypes = new Map<string,FieldTypeDefinition>([
    ['text',TEXT_FIELD_DEFINITION],
    ['checkbox',CHECKBOX_FIELD_DEFINITION],
    ['select',SELECT_FIELD_DEFINITION],
    ['date',DATE_FIELD_DEFINITION],
  ]);

  getFieldType(type:string):FieldTypeDefinition{
    return this.fieldTypes.get(type) as FieldTypeDefinition;
  }

  getAllFieldTypes():FieldTypeDefinition[]{
    return Array.from(this.fieldTypes.values());
  }
}
