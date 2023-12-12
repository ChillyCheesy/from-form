import { FrmContext } from '../../models';
import { GroupFrmController } from '../group.controller';
import { ParentContext } from './parent-form.context';

export class GroupFrmContext<T> extends ParentContext<T> {

  public constructor(
    contextName: string,
    frmController: GroupFrmController<T>,
    parentFrmContext?: FrmContext
  ) {
    super(contextName, frmController, parentFrmContext);
  }

}
