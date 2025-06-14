import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementsMenu } from "./components/form-elements-menu/form-elements-menu";
import { MainCanvas } from "./components/main-canvas/main-canvas";
import { FieldSettings } from "./components/field-settings/field-settings";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [DragDropModule,RouterOutlet, FormElementsMenu, MainCanvas, FieldSettings],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'dynamic-form-builder';
}
