import { Injectable, signal } from '@angular/core';
import { FormRow } from '../types/form';
import { FormFiled } from '../types/field';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();

  constructor(){
    this._rows.set([
      {
        id:crypto.randomUUID(),
        fields:[]
      }
    ])
  }
  addField(field:FormFiled,rowId:string,index?:number){
    const rows = this._rows();
    const newRows = rows.map(row => {
      if(rowId === row.id){
        const updatedFields = [...row.fields];
        if(index !== undefined){
          updatedFields.splice(index,0,field);
        }else{
          updatedFields.push(field); 
        }
        return {
          ...row,
          fields:updatedFields,
        }
      }else{
        return row;
      }
    })
    this._rows.set(newRows);
  }
}
