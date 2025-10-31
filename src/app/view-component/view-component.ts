import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExportForm } from '../services/export-form.service';
import { FormElementsMenu } from '../components/form-elements-menu/form-elements-menu';
import { MainCanvas } from '../components/main-canvas/main-canvas';
import { FieldSettings } from '../components/field-settings/field-settings';
@Component({
  selector: 'app-view-component',
  imports: [DragDropModule,RouterOutlet, FormElementsMenu, MainCanvas, FieldSettings,MatButtonModule,MatIconModule],
  templateUrl: './view-component.html',
  styleUrl: './view-component.scss'
})
export class ViewComponent {
  exportFormService = inject(ExportForm);
  protected title = 'dynamic-form-builder';
    exportForm(){
      const formCode = this.exportFormService.generateFormCode();
      const blob = new Blob([formCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'form.ts';
      a.click();

  }
}
