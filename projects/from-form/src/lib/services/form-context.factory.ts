import { Injectable, Type } from '@angular/core';
import { ContextBuilder } from '../forms/controllers/contexts/context.builder';
import { ParentContext } from '../forms/controllers/contexts/parent-form.context';
import { FrmContext, FrmController } from '../forms/models';

@Injectable()
export class FormContextFactory {

  public createContext<T extends FrmContext>(type: Type<T>, parentContext: FrmContext | undefined, controller: FrmController<any>): T {
    const contextName: string = (controller.name ?? 'root') as string;
    const builder: ContextBuilder = new ContextBuilder()
      .setFrmController(controller)
      .setContextName(contextName);
    if (parentContext) {
      builder.setParentFrmContext(parentContext);
      if (parentContext instanceof ParentContext) {
        const result: T = builder.build(type);
        parentContext.setChild(contextName, result);
        return result;
      }
    }
    return builder.build(type);
  }
}
