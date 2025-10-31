import { Component, input, output } from '@angular/core';
import { OptionItem } from '../../../types/field';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-options',
  imports: [MatButtonModule, MatIconModule,MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './dynamic-options.html',
  styleUrl: './dynamic-options.scss'
})
export class DynamicOptions {
  options = input.required<OptionItem[]>();
  title = input<string>();
  optionsChange = output<OptionItem[]>();
  addOption(){
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.push({label:`Option ${newOptions.length + 1}`,value:`option${newOptions.length + 1}`});
    this.optionsChange.emit(newOptions);
  }

  updateOption(index:number, newLabel:string){
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions[index] = {
      ...newOptions[index],
      label:newLabel,
    }
    this.optionsChange.emit(newOptions);
  }
  removeOption(index:number){
    const currentOptions = this.options();
    const newOptions = [...currentOptions];
    newOptions.splice(index,1);
    this.optionsChange.emit(newOptions);
  }
}
