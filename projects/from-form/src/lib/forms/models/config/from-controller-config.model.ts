import { Operable } from '../from-operator.model';
import { FrmValidatorFn } from '../from-validators.model';

/**
 * The FrmControlConfig interface represents the configuration of the control.
 * It is used to create the control.
 */
export interface FrmControlConfig<T> {
  /**
   * The value of the control.
   */
  value: T | undefined;
  /**
   * The disabled state of the control.
   * The state return true if the control is disabled, otherwise false.
   */
  disabled: boolean;
  /**
   * The hide state of the control.
   * The state return true if the control is hide, otherwise false.
   */
  hide: boolean;
  /**
   * The validators of the control.
   * The validators are used to validate the value of the control.
   * The validators are executed in the order in which they are defined.
   */
  validators: FrmValidatorFn<T | undefined>[];
  /**
   * The context data of the control.
   * You can provide any data you want to use in the controller.
   * It will be available in the FrmContext. and injected in the context of the template.
   */
  contextData: Operable<{ [key: string]: any; }>;
}

