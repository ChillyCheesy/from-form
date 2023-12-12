import { Directive, EmbeddedViewRef, Inject, Input, OnDestroy, OnInit, Optional, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { SimpleFrmContext } from '../forms/controllers/contexts/simple-form.context';
import { FrmContext, FrmContextProvider, FromControllerAccessor } from '../forms/models';
import { FrmController } from '../forms/models/from-controller.model';
import { FROM_FORM_CONTEXT_PROVIDER } from '../from-form.config';
import { FormContextFactory } from '../services/form-context.factory';
import { FromFormAccessorFactory } from '../services/from-form-accessor.factory';
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
  private _viewRef!: EmbeddedViewRef<any>;

  public constructor(
    @Optional() @SkipSelf() @Inject(FROM_FORM_CONTEXT_PROVIDER)
    private readonly parentContext: FrmContextProvider,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly fromformAccessorFactory: FromFormAccessorFactory,
    private readonly formContextFactory: FormContextFactory,
  ) { }

  public ngOnInit(): void {
    const parentContext: FrmContext | undefined = this.parentContext?.frmContext;
    this.frmContext = this.formContextFactory.createContext(SimpleFrmContext, parentContext, this.frmController);
    this._engine = new FrmFormControlDirectiveEngine(this.frmContext);
    this._viewRef = this._engine.renderController(this.viewContainerRef, this.templateRef);
  }

  public ngAfterViewInit(): void {
    const accessor: FromControllerAccessor<T> | undefined = this.fromformAccessorFactory.createAccessor<T>(this._viewRef);
    if (accessor) this._engine.bindToAccessor(accessor);
  }

  public ngOnDestroy(): void {
    this._viewRef.destroy();
    this._engine.destroy();
  }

}
