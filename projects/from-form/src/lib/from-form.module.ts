import { NgModule, Type } from '@angular/core';
import { FrmFormControlDirective, FrmGroupFormControlDirective } from './directives';
import { FrmOperatePipe } from './pipes/operate.pipe';
import { FormContextFactory } from './services/form-context.factory';
import { FromFormAccessorFactory } from './services/from-form-accessor.factory';

const DECLARATION: Type<unknown>[] = [
  FrmFormControlDirective,
  FrmGroupFormControlDirective,
  FrmOperatePipe
];

@NgModule({
  declarations: [DECLARATION],
  exports: [DECLARATION],
  providers: [FromFormAccessorFactory, FormContextFactory]
})
export class FromFormModule {
}
