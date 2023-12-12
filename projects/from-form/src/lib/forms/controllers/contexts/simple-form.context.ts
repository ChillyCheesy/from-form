import { FrmContext, FrmController } from '../../models';

export class SimpleFrmContext<T> implements FrmContext {

  public constructor(
    public readonly contextName: string,
    public readonly frmController: FrmController<T>,
    public readonly parentFrmContext?: FrmContext
  ) { }

}
