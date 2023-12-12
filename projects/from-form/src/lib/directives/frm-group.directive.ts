import { Directive, EmbeddedViewRef, Inject, Input, OnDestroy, OnInit, Optional, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { GroupFrmController } from '../forms/controllers';
import { GroupFrmContext } from '../forms/controllers/contexts/group-form.context';
import { FrmContext, FrmContextProvider } from '../forms/models';
import { FROM_FORM_CONTEXT_PROVIDER } from '../from-form.config';
import { FormContextFactory } from '../services/form-context.factory';

@Directive({
  selector: '[frmGroupControl]',
  providers: [
    {
      provide: FROM_FORM_CONTEXT_PROVIDER,
      useExisting: FrmGroupFormControlDirective,
    }
  ]
})
export class FrmGroupFormControlDirective<T> implements FrmContextProvider, OnInit, OnDestroy {

  @Input('frmGroupControl')
  public frmGroupController!: GroupFrmController<T>;
  public frmContext!: FrmContext;

  private _embeddedViewRef!: EmbeddedViewRef<any>;

  public constructor(
    @Optional() @SkipSelf() @Inject(FROM_FORM_CONTEXT_PROVIDER)
    private readonly parentContext: FrmContextProvider,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly contextFactory: FormContextFactory,
  ) { }

  public ngOnInit(): void {
    const parentContext: FrmContext | undefined = this.parentContext?.frmContext;
    this.frmContext = this.contextFactory.createContext(GroupFrmContext<T>, parentContext, this.frmGroupController);
    this._embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.frmContext.contextData,
      ...this.frmContext.contextData,
    });
  }

  public ngOnDestroy(): void {
    this._embeddedViewRef.destroy();
  }
}
