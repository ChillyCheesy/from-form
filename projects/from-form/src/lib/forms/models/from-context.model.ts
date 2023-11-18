import { FrmController } from './from-controller.model';
import { Operable } from './from-operator.model';

/**
 * Represents a context provider.
 */
export interface FrmContextProvider {
  /**
   * The context of the form control.
   */
  frmContext: FrmContext;
}

/**
 * Represents a context of a form control.
 */
export interface FrmContext {
  /**
   * The name of the context.
   * It is used to identify the context.
   * The name must be unique.
   */
  contextName: string;
  /**
   * The controller of the context.
   * It is used to access and update the control's value and validation state.
   */
  frmController: FrmController<any>;
  /**
   * The parent context of the context.
   * It is used to access and update the parent control's value and validation state.
   */
  parentFrmContext?: FrmContext;
  /**
   * The context data of the context.
   * You can provide any data you want to use in the controller.
   * It will be available in the FrmContext. and injected in the context of the template.
   */
  contextData?: Operable<{ [key: string]: any; }>;
};

