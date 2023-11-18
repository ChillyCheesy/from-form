import { Directive, Input, OnDestroy, OnInit, Optional, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { SimpleFrmContext } from '../forms/controllers/contexts/simple-context.context';
import { FrmContext, FrmContextProvider } from '../forms/models';
import { FrmController } from '../forms/models/from-controller.model';
import { FromFormAccessorFactory } from '../forms/services/from-form-accessor.factory';
import { FROM_FORM_CONTEXT_PROVIDER } from '../from-form.config';
import { FrmFormControlDirectiveEngine } from './form-control-directive.engine';

@Directive({
  selector: '[frmFormControl]',
  providers: [
    {
      provide: FROM_FORM_CONTEXT_PROVIDER,
      useExisting: FrmFormControlDirective,
    }
  ]
})
export class FrmFormControlDirective<T> implements FrmContextProvider, OnInit, OnDestroy {

  @Input('frmFormControl')
  public frmController!: FrmController<T>;
  public frmContext!: FrmContext;

  private _engine!: FrmFormControlDirectiveEngine<T>;

  public constructor(
    @Optional() @SkipSelf()
    private readonly parentDirective: FrmFormControlDirective<T>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly fromformAccessorFactory: FromFormAccessorFactory
  ) { }

  public ngOnInit(): void {
    const parentContext: FrmContext | undefined = this.parentDirective?.frmContext;
    this.frmContext = new SimpleFrmContext('root', this.frmController, parentContext);
    this._engine = new FrmFormControlDirectiveEngine<T>(this.frmContext, this.viewContainerRef, this.templateRef);
    this._engine.onInit();
  }

  public ngAfterViewInit(): void {
    this._engine.onAfterViewInit(this.fromformAccessorFactory);
  }

  public ngOnDestroy(): void {
    this._engine.onDestroy();
  }

}
