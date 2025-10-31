import { Component, inject, input } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FormService } from '../../../services/form.service';
import { FieldTypeDefinition, FormFiled } from '../../../types/field';
import { FormField } from "../form-field/form-field";
import { FormRow } from '../../../types/form';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormField,MatIconModule,MatButtonModule,DragDropModule],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss'
})
export class FormEditor {
  formService = inject(FormService);
  // row = input.required<FormRow>();
  rows = this.formService.rows();
  onDropInRow(event: CdkDragDrop<any>,rowId:string) {
    if(event.previousContainer.data === "hey-iam-from-form-elements-menu") {
      const field = event.item.data as FieldTypeDefinition;
      const newField : FormFiled = {
        id:crypto.randomUUID(),
        type:field.type,
        label:field.label,
        icon:field.icon,
        ...field.defaultConfig
      }
      this.formService.addField(newField,rowId,event.currentIndex);
      return;
    }
    else{
      this.formService.moveField(event.item.data.id,event.previousContainer.data,rowId,event.currentIndex);
      return;
    }
  }
  deleteRow(rowId:string){
    this.formService.deleteRow(rowId)
  }
  moveRowUp(rowId:string){
    this.formService.moveRowUp(rowId)
  }
  moveRowDown(rowId:string){
    this.formService.moveRowDown(rowId)
  }
}
