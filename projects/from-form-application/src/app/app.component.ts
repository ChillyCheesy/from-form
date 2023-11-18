import { Component } from '@angular/core';
import { FrmController, buildController, use } from 'from-form';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <div *frmFormControl="frmController">
    <input>
    <span>{{ frmController.value$ | async }}</span>
    <button (click)="uppercase()">uppercase</button>
  </div>
  `,
  styles: [`div{display:flex;flex-direction:column;max-width:300px;}`]
})
export class AppComponent {

  public frmController: FrmController<string> = buildController<string>({
    contextData: use({
      label: (context) => context.frmController.value$.pipe(
        map((value: string | undefined) => value?.toUpperCase())
      ),
    }),
  });

  public uppercase(): void {
    this.frmController.updateValue((value: string | undefined) => value?.toUpperCase());
  }

}
