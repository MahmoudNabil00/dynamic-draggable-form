import { inject, Injectable } from '@angular/core';
import { FormService } from './form.service';
import { FormFiled } from '../types/field';
import { FieldTypesService } from './field-types.service';

@Injectable({
  providedIn: 'root'
})
export class ExportForm {
  fieldTypesService = inject(FieldTypesService);
  formService = inject(FormService);
  constructor() { }
  exportForm(){
    const formCode = this.generateFormCode() 
  }
  generateFormCode() : string{
    let code =  this.generateImports()
    code += this.generateComponentDecorator();
    code += `template: \` \n`;
    code += `  <form class="flex flex-col gap-4"> \n`;
    const rows = this.formService.rows();
    for(let row of rows){
      if(row.fields.length > 0){
        code += `  <div class="flex flex-col gap-4 flex-wrap"> \n`;
        for(let field of row.fields){
          code += `  <div class="flex-1"> \n`;
          code += this.generateFieldCode(field);
          code += `  </div> \n`;
        }
        code += `  </div> \n`;
      }

    }
    code += `  </form> \n`;
    code += `\` \n`;
    code += `}) \n`;
    code += `export class GeneratedFormComponent { \n`;
    code +=  `}\n`;
    return code;
  }
  generateImports() : string{
    return (
      `import {component} from '@angular/core' \n` + 
      `import { CommonModule } from '@angular/common' \n` +
      `import { FormsModule } from '@angular/forms' \n` +
      `import { MatFormFieldModule } from '@angular/material/form-field' \n` +
      `import { MatInputModule } from '@angular/material/input' \n` +
      `import { MatSelectModule } from '@angular/material/select' \n` +
      `import { MatCheckboxModule } from '@angular/material/checkbox' \n` +
      `import { MatRadioModule } from '@angular/material/radio' \n` +
      `import { MatDatepickerModule } from '@angular/material/datepicker' \n` +
      `import { MatNativeDateModule } from '@angular/material/core' \n` +
      `import { MatButtonModule } from '@angular/material/button' \n` +
      `import { MatIconModule } from '@angular/material/icon' \n` 
    )
  }
  generateComponentDecorator() : string{
    return (
      `@Component({ \n` +
      `  standalone: true, \n` +
      `  selector: 'app-generated-form', \n` +
      `  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule], \n` +
      `}) \n`
    )
  }
  generateFieldCode(field:FormFiled) : string{
    const fieldType = this.fieldTypesService.getFieldType(field.type);
    return fieldType?.generateCode?.(field) ?? '';
  }
}
