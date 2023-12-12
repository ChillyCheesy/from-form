import { FrmContext, FrmController } from '../../models';

export class ParentContext<T> implements FrmContext {

  private _childContexts: Map<string, FrmContext> = new Map<string, FrmContext>();

  public constructor(
    public readonly contextName: string,
    public readonly frmController: FrmController<T>,
    public readonly parentFrmContext?: FrmContext
  ) { }

  public get child(): Map<string, FrmContext> {
    return this._childContexts;
  }

  public setChild(contextName: string, frmContext: FrmContext): void {
    this._childContexts.set(contextName, frmContext);
  }

  public getChild(contextName: string): FrmContext | undefined {
    return this._childContexts.get(contextName);
  }

}
