import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FrmContextProvider, FrmOperation } from '../forms/models';
import { FROM_FORM_CONTEXT_PROVIDER } from '../from-form.config';

@Pipe({
  name: 'frmOperate',
  pure: true
})
export class FrmOperatePipe<T> implements PipeTransform {

  public constructor(
    @Inject(FROM_FORM_CONTEXT_PROVIDER)
    private readonly contextProvider: FrmContextProvider,
  ) { }

  public transform(value: FrmOperation<T>): Observable<T> {
    if (!this.contextProvider) throw new Error('This pipe must be used inside a frmFormControl directive.');
    if (!this.contextProvider.frmContext) throw new Error('The frmContext is required.');
    if (!value) throw new Error('The value is required.');
    return value(this.contextProvider.frmContext);
  }

}
