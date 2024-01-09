import { Component } from '@angular/core';
import { createController, createGroupController, use } from 'from-form';

@Component({
  selector: 'app-root',
  template: `
    <div *frmGroupControl="formGroup; let data = prout">
      {{ data | frmOperate | async | json }}
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

  public formGroup = createGroupController({
    name: createController({
      value: use('hello world'),
    }),
    truc: createGroupController({
      bite: createGroupController({
        test: createController({
          value: use('hello world'),
        }),
      }),
    }),
  },
  {
    contextData: use({
      prout: use('patate')
    })
  });

  public name = this.formGroup.get('truc').get('bite').get('test');

  public uppercase(): void {
    this.formGroup.get('truc').get('bite').get('test').updateValue((value: string | undefined) => value?.toUpperCase());
  }

}
