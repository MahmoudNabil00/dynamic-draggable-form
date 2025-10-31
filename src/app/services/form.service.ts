import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../types/form';
import { FormFiled } from '../types/field';
import { FormField } from '../components/main-canvas/form-field/form-field';
import { startViewTransition } from '../helper/view-transition';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();
  private _selectedFieldId = signal<string | undefined>(undefined);
  public readonly selectedField = computed(()=>this._rows().flatMap(row=>row.fields).find(field=>field.id === this._selectedFieldId()));
  private appRef = inject(ApplicationRef);
  constructor(){
    this._rows.set([
      {
        id:crypto.randomUUID(),
        fields:[]
      },
    ])
  }
  addField(field:FormFiled,rowId:string,index?:number){
      const rows = this._rows();
      // In signal the recommended way to update the state is to create a new array (Immutable) and then set the new array to the signal
      const newRows = rows.map(row => {
        if(rowId === row.id){
          // add the field in the required row
          const updatedFields = [...row.fields];
          if(index !== undefined){
            updatedFields.splice(index,0,field);
          }else{
            updatedFields.push(field); 
          }
          return {
            id:row.id,
            fields:updatedFields,
          }
        }else{
          return row;
        }
      })
      startViewTransition(() => {
        this._rows.set(newRows);
        this.appRef.tick();
      });

    // this._rows.update((currentRows: FormRow[]) => {
    //   const targetRwoIndex = currentRows.findIndex(row => row.id === rowId);
    //   const targetRow = currentRows[targetRwoIndex];
    //   if(index !== undefined){
    //     targetRow.fields.splice(index,0,field);
    //   }else{
    //     targetRow.fields.push(field);
    //   }
    //   const newRows = [...currentRows];
    //   newRows.splice(targetRwoIndex,1,targetRow);
       
    //   return newRows;
    // })

    // this._rows.update((currentRows: FormRow[]) => {
    //   const targetRwo = currentRows.find(row => row.id === rowId);
    //   if(index !== undefined){
    //     targetRwo?.fields.splice(index,0,field)
    //   }else{
    //     targetRwo?.fields.push(field);
    //   }
    //   return currentRows;
    // })
  }

  deleteField(fieldId : string,rowId?:any){
    const rows = this._rows()
    const newRows = rows.map(row=>{
      return {
        id:row.id,
        fields:row.fields.filter(field => field.id !== fieldId)
      }
    });
    startViewTransition(() => {
      this._rows.set(newRows);

    });

    // const rows = this._rows()
    // const newRows = rows.map(row=>{
    //   if(row.id === rowId){
    //     return {
    //       ...row,
    //       fields:row.fields.filter(filed => filed.id !== fieldId)
    //     }
    //   }else{
    //     return {...row}
    //   }
    // })
    // this._rows.set(newRows)
  }
  addRow(){
    const newRow : FormRow = {
      id:crypto.randomUUID(),
      fields:[]
    }
    const currentRows = this._rows()
    startViewTransition(() => {
      this._rows.set([...currentRows,newRow]);
    });
  }
  deleteRow(rowId:string){
    const rows = this._rows()
    const newRows = rows.filter(row=>row.id !== rowId)
    startViewTransition(() => {
      this._rows.set(newRows);
      this.appRef.tick();
    });
  }
  moveField(fieldId:string,sourceRowId:string,targetRowId:string,targetIndex:number=-1){
    const rows = this._rows();
    let filedToMove : FormFiled | undefined;
    let sourceRowIndex  = -1;
    let sourceFieldIndex = -1;
    rows.forEach((row,rowIndex)=>{
      sourceRowIndex = rowIndex;
      sourceFieldIndex = row.fields.findIndex(field=>field.id === fieldId);
      if(sourceFieldIndex !== -1){
        filedToMove = row.fields[sourceFieldIndex];
      }
    });
    if(!filedToMove) return;
    
    const newRows = [...rows];
    const fieldWithRemoveField = newRows[sourceRowIndex].fields.filter(field=>field.id !== fieldId);
    newRows[sourceRowIndex].fields = fieldWithRemoveField;
    const targetRowIndex = newRows.findIndex(row=>row.id === targetRowId);
    if(targetRowIndex !== -1){
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex,0,filedToMove);
      newRows[targetRowIndex].fields = targetFields;
    }
    startViewTransition(() => {
      this._rows.set(newRows);
      this.appRef.tick();
    });

  }
  setSelectedField(fieldId:string){
    this._selectedFieldId.set(fieldId);
  }
  updateField(fieldId:string, data:Partial<FormFiled>){
    const rows = this._rows()
    const newRows = rows.map(row=>{
      return {
        ...row,
        fields:row.fields.map(field=>{
          if(field.id === fieldId){
            return {
              ...field,
              ...data
            }
          }
          return field;
        })
      }
    })
    this._rows.set(newRows)
  }
  moveRowUp(rowId:string){
    const rows = this._rows();
    const index = rows.findIndex(row=>row.id === rowId);
    if(index > 0){
      const newRows = [...rows];
      const previousRow = newRows[index - 1];
      newRows[index - 1] = rows[index];
      newRows[index] = previousRow;
      startViewTransition(() => {
        this._rows.set(newRows);
      });

    }
  }
  moveRowDown(rowId:string){
    const rows = this._rows();
    const index = rows.findIndex(row=>row.id === rowId);
    if(index < rows.length - 1){
      const newRows = [...rows];
      const nextRow = newRows[index + 1];
      newRows[index + 1] = rows[index];
      newRows[index] = nextRow;

      startViewTransition(() => {
        this._rows.set(newRows);
      });

    }
  }
}
