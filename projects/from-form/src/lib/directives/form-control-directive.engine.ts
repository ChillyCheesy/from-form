import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription, combineLatest, map, switchMap } from 'rxjs';
import { FrmContext, FrmControlConfig, FrmController, FrmValidatorFn, FromControllerAccessor, Operable } from '../forms/models';
import { use } from '../forms/operators';

export class FrmFormControlDirectiveEngine<T> {

  private _valueSubscription!: Subscription;
  private _disabledSubscription!: Subscription;
  private _hideSubscription!: Subscription;
  private _validatorsSubscription!: Subscription;

  private _accesorDisabledSubscription!: Subscription;
  private _accesorValueSubscription!: Subscription;

  private _contextDataSubscription!: Subscription;

  public constructor(
    public readonly frmContext: FrmContext
  ) { }

  public renderController(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<{ [key: string]: any }>): EmbeddedViewRef<any> {
    if (!this.frmContext) throw new Error('The context is required.');
    const controller: FrmController<T> = this.frmContext.frmController;
    const config: Operable<FrmControlConfig<T>> = controller.config;
    // create the embedded view and update the context data when the context data changes
    const embeddedViewRef = viewContainerRef.createEmbeddedView(templateRef, {
      $implicit: this.frmContext.contextData,
      ...this.frmContext.contextData,
    });
    this._contextDataSubscription = config.contextData(this.frmContext).subscribe((contextData: { [key: string]: any; }) => {
      this.frmContext.contextData = contextData ?? use(undefined);
      embeddedViewRef.context = this.frmContext.contextData;
    });
    // update the controller when the value changes
    this._valueSubscription = config.value(this.frmContext).subscribe((value: T | undefined) => controller.writeValue(value));
    // update the controller when the disabled state changes
    this._disabledSubscription = config.disabled(this.frmContext).subscribe((disabled: boolean) => controller.setDisableState(disabled));
    // update the view when the hide state changes
    this._hideSubscription = config.hide(this.frmContext).subscribe((hide: boolean) => {
      if (hide) viewContainerRef.detach();
      else viewContainerRef.insert(embeddedViewRef);
    });
    // update the controller when the validators changes
    this._validatorsSubscription = config.validators(this.frmContext).pipe(
      switchMap((valitators: FrmValidatorFn<T>[]) => controller.value$.pipe(
        map((value: T | undefined) => valitators.map((validator: FrmValidatorFn<T>) => validator(value))),
      )),
      switchMap((validations: Observable<boolean>[]) => combineLatest(validations)),
      map((validations: boolean[]) => validations.every((valid: boolean) => valid))
    ).subscribe((valid: boolean) => controller.setValidState(valid));
    return embeddedViewRef;
  }

  public bindToAccessor(accessor: FromControllerAccessor<T>): void {
    if (!this.frmContext) throw new Error('The context is required.');
    const crontroller: FrmController<T> = this.frmContext.frmController;
    accessor.registerOnChange((value: T) => crontroller.writeValue(value));
    accessor.registerOnTouched(() => crontroller.setTouchedState(true));
    this._accesorDisabledSubscription = crontroller.disable$.subscribe((disabled: boolean) => accessor.setDisabledState(disabled));
    this._accesorValueSubscription = crontroller.value$.subscribe((value: T | undefined) => accessor.writeValue(value));
  }

  public destroy(): void {
    this._valueSubscription.unsubscribe();
    this._disabledSubscription.unsubscribe();
    this._hideSubscription.unsubscribe();
    this._validatorsSubscription.unsubscribe();
    this._accesorDisabledSubscription.unsubscribe();
    this._accesorValueSubscription.unsubscribe();
    this._contextDataSubscription.unsubscribe();
  }

}
