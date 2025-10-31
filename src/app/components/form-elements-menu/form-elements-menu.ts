import { Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types.service';
import { FieldButton } from "./field-button/field-button";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButton,DragDropModule],
  templateUrl: './form-elements-menu.html',
  styleUrl: './form-elements-menu.scss'
})
export class FormElementsMenu {
  fieldTypesService = inject(FieldTypesService);
  fieldTypes = this.fieldTypesService.getAllFieldTypes();

  noDropAllowed(item:any){
    return false
  }
}
