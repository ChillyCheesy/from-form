import { NgModule, Type } from '@angular/core';
import { FrmFormControlDirective } from './directives/frm-control.directive';
import { FromFormAccessorFactory } from './forms/services/from-form-accessor.factory';
import { FrmOperatePipe } from './pipes/operate.pipe';

const DECLARATION: Type<unknown>[] = [
  FrmFormControlDirective,
  FrmOperatePipe
];

@NgModule({
  declarations: [DECLARATION],
  exports: [DECLARATION],
  providers: [FromFormAccessorFactory]
})
export class FromFormModule {
}
