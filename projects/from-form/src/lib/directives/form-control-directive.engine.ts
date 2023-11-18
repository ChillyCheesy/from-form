import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription, combineLatest, map, switchMap } from 'rxjs';
import { FrmContext, FrmController, FrmValidatorFn, FromControllerAccessor, OperableFrmControlConfig } from '../forms/models';
import { use } from '../forms/operators';
import { FromFormAccessorFactory } from '../forms/services/from-form-accessor.factory';

export class FrmFormControlDirectiveEngine<T> {

  private _embeddedViewRef!: EmbeddedViewRef<any>;

  private _valueSubscription!: Subscription;
  private _disabledSubscription!: Subscription;
  private _hideSubscription!: Subscription;
  private _validatorsSubscription!: Subscription;

  private _accesorDisabledSubscription!: Subscription;
  private _accesorValueSubscription!: Subscription;

  private _contextDataSubscription!: Subscription;

  public constructor(
    public readonly frmContext: FrmContext,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
  ) { }

  public onInit(): void {
    if (!this.frmContext) throw new Error('The context is required.');
    const controller: FrmController<T> = this.frmContext.frmController;
    const config: OperableFrmControlConfig<T> = controller.config;
    this._contextDataSubscription = config.contextData(this.frmContext)
      .subscribe((contextData: { [key: string]: any; }) => this.frmContext.contextData = contextData);
    // Subscribe to context data changes to update the embedded view
    this._embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.frmContext.contextData ?? use(undefined),
      frmFormControl: this.frmContext.contextName,
    });
    this._valueSubscription = config.value(this.frmContext).subscribe((value: T | undefined) => controller.writeValue(value));
    this._disabledSubscription = config.disabled(this.frmContext).subscribe((disabled: boolean) => controller.setDisableState(disabled));
    this._hideSubscription = config.hide(this.frmContext).subscribe((hide: boolean) => {
      if (hide) this.viewContainerRef.detach();
      else this.viewContainerRef.insert(this._embeddedViewRef);
    });
    this._validatorsSubscription = config.validators(this.frmContext).pipe(
      switchMap((valitators: FrmValidatorFn<T>[]) => controller.value$.pipe(
        map((value: T | undefined) => valitators.map((validator: FrmValidatorFn<T>) => validator(value))),
      )),
      switchMap((validations: Observable<boolean>[]) => combineLatest(validations)),
      map((validations: boolean[]) => validations.every((valid: boolean) => valid))
    ).subscribe((valid: boolean) => controller.setValidState(valid));
    ////////////////////////////////////////////////////////////////
  }

  public onAfterViewInit(factory: FromFormAccessorFactory): void {
    const crontroller: FrmController<T> = this.frmContext.frmController;
    const accessor: FromControllerAccessor<T> | undefined = factory.createAccessor<T>(this._embeddedViewRef);
    if (!accessor) throw new Error('We can\'t find the accessor element in the template. Please use the directive on an input element or a custom element with the FromControllerAccessor interface implemented.');
    accessor.registerOnChange((value: T) => crontroller.writeValue(value));
    accessor.registerOnTouched(() => crontroller.setTouchedState(true));
    this._accesorDisabledSubscription = crontroller.disable$.subscribe((disabled: boolean) => accessor.setDisabledState(disabled));
    this._accesorValueSubscription = crontroller.value$.subscribe((value: T | undefined) => accessor.writeValue(value));
  }

  public onDestroy(): void {
    this._valueSubscription.unsubscribe();
    this._disabledSubscription.unsubscribe();
    this._hideSubscription.unsubscribe();
    this._validatorsSubscription.unsubscribe();
    this._accesorDisabledSubscription.unsubscribe();
    this._accesorValueSubscription.unsubscribe();
    this._contextDataSubscription.unsubscribe();
    this.viewContainerRef.clear();
  }

}
