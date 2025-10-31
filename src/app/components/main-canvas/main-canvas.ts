import { Component, inject, signal } from '@angular/core';
import { FormEditor } from "./form-editor/form-editor";
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import { FormPreview } from "./form-preview/form-preview";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../../services/form.service';
@Component({
  selector: 'app-main-canvas',
  imports: [FormEditor, MatButtonToggleModule, FormPreview,MatIconModule,MatButtonModule],
  templateUrl: './main-canvas.html',
  styleUrl: './main-canvas.scss'
})
export class MainCanvas {
  activeTab = signal<'preview' | 'editor'>('editor');
  formService = inject(FormService)
  addRow(){
    this.formService.addRow()
  }
}
