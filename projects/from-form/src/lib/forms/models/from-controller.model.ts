import { Observable } from 'rxjs';
import { Operable, UpdateValueFn } from './from-operator.model';
import { FrmValidatorFn } from './from-validators.model';

/**
 * An OperableFrmControlConfig is a FrmControlConfig that can be define with the operators.
 */
export type OperableFrmControlConfig<T> = Operable<FrmControlConfig<T>>;

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
  validators: Array<FrmValidatorFn<T | undefined>>;
  /**
   * The context data of the control.
   * You can provide any data you want to use in the controller.
   * It will be available in the FrmContext. and injected in the context of the template.
   */
  contextData: Operable<{ [key: string]: any; }>;
}

export type FrmGroupConfig<T> = {
  [P in keyof T]: FrmController<T[P]>;
};

/**
 * The FrmController interface represents the control of the form.
 * It is used to access and update the control's value and validation state.
 */
export interface FrmController<T> {
  /**
   * The configuration of the control.
   * It is used to represent the change operation in real time.
   */
  config: OperableFrmControlConfig<T>;
  /**
   * The value of the control.
   * In representing the value in real time, the value$ observable is used.
   */
  value$: Observable<T | undefined>;
  /**
   * The enabled state of the control.
   * It is used to represent the enabled state in real time.
   * The state return true if the control is enabled, otherwise false.
   */
  enable$: Observable<boolean>;
  /**
   * The disabled state of the control.
   * It is used to represent the disabled state in real time.
   * The state return true if the control is disabled, otherwise false.
   */
  disable$: Observable<boolean>;
  /**
   * The touched state of the control.
   * It is used to represent the touched state in real time.
   * The state return true if the user has interacted with the form control, e.g., by clicking or focusing on it.
   */
  touched$: Observable<boolean>;
  /**
   * The untouched state of the control.
   * It is used to represent the untouched state in real time.
   * The state return true if the user has not yet interacted with the form control, e.g., by clicking or focusing on it.
   */
  untouched$: Observable<boolean>;
  /**
   * The dirty state of the control.
   * It is used to represent the dirty state in real time.
   * The state return true if the user has changed the value of the control.
   */
  dirty$: Observable<boolean>;
  /**
   * The pristine state of the control.
   * It is used to represent the pristine state in real time.
   * The state return true if the user has not yet changed the value of the control.
   */
  pristine$: Observable<boolean>;
  /**
   * The valid state of the control.
   * It is used to represent the valid state in real time.
   * The state return true if the control has passed all validation checks, otherwise false.
   */
  valid$: Observable<boolean>;
  /**
   * The invalid state of the control.
   * It is used to represent the invalid state in real time.
   * The state return true if the control has failed any of the validation checks, otherwise false.
   */
  invalid$: Observable<boolean>;
  /**
   * Update the value of the control.
   *
   * @param {T} value The new value for the control.
   * @memberof FrmController
   */
  writeValue(value: T | undefined): void;
  /**
   * Update the value of the control with the provided function.
   * @param updateFn The function that will update the value of the control.
   */
  updateValue(updateFn: UpdateValueFn<T | undefined>): void;
  /**
   * Update the enable state of the control.
   * @param enable The new enable state for the control.
   */
  setEnableState(enable: boolean): void;
  /**
   * Update the enable state of the control.
   * @param updateFn The function that will update the enable state for the control.
   */
  updateEnableState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the disable state of the control.
   * @param disable The new disable state for the control.
   */
  setDisableState(disable: boolean): void;
  /**
   * Update the disable state of the control.
   * @param updateFn The function that will update the disabled state for the control.
   */
  updateDisableState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the touched state of the control.
   * @param touched The new touched state for the control.
   */
  setTouchedState(touched: boolean): void;
  /**
   * Update the touched state of the control.
   * @param updateFn The function that will update the touched state for the control.
   */
  updateTouchedState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the untouched state of the control.
   * @param untouched The new untouched state for the control.
   */
  setUntouchedState(untouched: boolean): void;
  /**
   * Update the untouched state of the control.
   * @param updateFn The function that will update the untouched state for the control.
   */
  updateUntouchedState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the dirty state of the control.
   * @param dirty The new dirty state for the control.
   */
  setDirtyState(dirty: boolean): void;
  /**
   * Update the dirty state of the control.
   * @param updateFn The function that will update the dirty state for the control.
   */
  updateDirtyState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the pristine state of the control.
   * @param pristine The new pristine state for the control.
   */
  setPristineState(pristine: boolean): void;
  /**
   * Update the pristine state of the control.
   * @param updateFn The function that will update the pristine state for the control.
   */
  updatePristineState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the valid state of the control.
   * @param valid The new valid state for the control.
   */
  setValidState(valid: boolean): void;
  /**
   * Update the valid state of the control.
   * @param updateFn The function that will update the valid state for the control.
   */
  updateValidState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the invalid state of the control.
   * @param invalid The new invalid state for the control.
   */
  setInvalidState(invalid: boolean): void;
  /**
   * Update the invalid state of the control.
   * @param updateFn The function that will update the invalid state for the control.
   */
  updateInvalidState(updateFn: UpdateValueFn<boolean>): void;
}
