import { Component } from '@angular/core';
import { FrmController, GroupFrmController, createController, createGroupController, use } from 'from-form';

@Component({
  selector: 'app-root',
  template: `
    <div *frmGroupControl="formGroup">
      <input *frmFormControl="name">
      <span></span>
      <button (click)="uppercase()">uppercase</button>
    </div>
    <span>
      {{ formGroup.value$ | async | json }}
    </span>
    <span>
      {{ formGroup.valid$ | async | json }}
    </span>
  `,
  styles: [`div{display:flex;flex-direction:column;max-width:300px;}`]
})
export class AppComponent {

  public formGroup: GroupFrmController<{ name: string }> = createGroupController({
    name: createController({
      value: use('hello world'),
    }),
  });

  public name: FrmController<string> = this.formGroup.get('name');

  public uppercase(): void {

  }

}
