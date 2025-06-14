export interface FieldTypeDefinition {
    type:string;
    label:string;
    icon:string;
}


export interface FormFiled {
    id:string;
    type:string;
    label?:string;
    icon?:string;
    value?:string;
    options?:string[];
    required?:boolean;
}

