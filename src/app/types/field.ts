import { Type } from "@angular/core";

export interface FieldTypeDefinition {
    type:string;
    label:string;
    icon:string;
    defaultConfig?:any;
    settingsConfig?:FieldSettingsDefinition[];
    component:Type<unknown>;
    generateCode:(field:FormFiled)=>string;
}

export interface FieldSettingsDefinition{
    type:'text' | 'checkbox' | 'select' | 'dynamic-options';
    key:string;
    label:string;
    options?:OptionItem[];
}

export interface OptionItem{
    label:string;
    value:any;
}

export interface FormFiled {
    id:string;
    type:string;
    label?:string;
    icon?:string;
    value?:string;
    options?:OptionItem[];
    required?:boolean;
    placeholder?:string;
    inputType?:string;
}

