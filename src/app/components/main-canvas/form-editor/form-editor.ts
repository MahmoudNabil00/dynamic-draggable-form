import { Component, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FormService } from '../../../services/form.service';
import { FieldTypeDefinition, FormFiled } from '../../../types/field';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss'
})
export class FormEditor {
  formService = inject(FormService);
  onDropInRow(event: CdkDragDrop<any>,rowId:string) {
    if(event.previousContainer.data === "hey-iam-from-form-elements-menu") {
      const field = event.item.data as FieldTypeDefinition;
      const newField : FormFiled = {
        id:crypto.randomUUID(),
        type:field.type,
        label:field.label,
        icon:field.icon
      }
      // this.formService.addField(event.item.data,event.container.data,event.currentIndex);
      return;
    }
  }
}
