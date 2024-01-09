import { Observable } from 'rxjs';
import { FrmControlConfig } from './config/from-controller-config.model';
import { Operable, UpdateValueFn } from './from-operator.model';

/**
 * The FrmController interface represents the controller of the form.
 * It is used to access and update the controller's value and validation state.
 */
export interface FrmController<T> {
  /**
   * The name of the controller.
   * It is used to represent the controller inside a conplex form.
   * If the name is not provided, the controller is considered as a root controller.
   */
  name?: string | number | symbol;
  /**
   * The configuration of the controller.
   * It is used to represent the change operation in real time.
   */
  config: Operable<FrmControlConfig<T>>;
  /**
   * The value of the controller.
   * In representing the value in real time, the value$ observable is used.
   */
  value$: Observable<T | undefined>;
  /**
   * The enabled state of the controller.
   * It is used to represent the enabled state in real time.
   * The state return true if the controller is enabled, otherwise false.
   */
  enable$: Observable<boolean>;
  /**
   * The disabled state of the controller.
   * It is used to represent the disabled state in real time.
   * The state return true if the controller is disabled, otherwise false.
   */
  disable$: Observable<boolean>;
  /**
   * The touched state of the controller.
   * It is used to represent the touched state in real time.
   * The state return true if the user has interacted with the form controller, e.g., by clicking or focusing on it.
   */
  touched$: Observable<boolean>;
  /**
   * The untouched state of the controller.
   * It is used to represent the untouched state in real time.
   * The state return true if the user has not yet interacted with the form controller, e.g., by clicking or focusing on it.
   */
  untouched$: Observable<boolean>;
  /**
   * The dirty state of the controller.
   * It is used to represent the dirty state in real time.
   * The state return true if the user has changed the value of the controller.
   */
  dirty$: Observable<boolean>;
  /**
   * The pristine state of the controller.
   * It is used to represent the pristine state in real time.
   * The state return true if the user has not yet changed the value of the controller.
   */
  pristine$: Observable<boolean>;
  /**
   * The valid state of the controller.
   * It is used to represent the valid state in real time.
   * The state return true if the controller has passed all validation checks, otherwise false.
   */
  valid$: Observable<boolean>;
  /**
   * The invalid state of the controller.
   * It is used to represent the invalid state in real time.
   * The state return true if the controller has failed any of the validation checks, otherwise false.
   */
  invalid$: Observable<boolean>;
  /**
   * Update the value of the controller.
   *
   * @param {T} value The new value for the controller.
   * @memberof FrmController
   */
  writeValue(value: T | undefined): void;
  /**
   * Update the value of the controller with the provided function.
   * @param updateFn The function that will update the value of the controller.
   */
  updateValue(updateFn: UpdateValueFn<T | undefined>): void;
  /**
   * Update the enable state of the controller.
   * @param enable The new enable state for the controller.
   */
  setEnableState(enable: boolean): void;
  /**
   * Update the enable state of the controller.
   * @param updateFn The function that will update the enable state for the controller.
   */
  updateEnableState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the disable state of the controller.
   * @param disable The new disable state for the controller.
   */
  setDisableState(disable: boolean): void;
  /**
   * Update the disable state of the controller.
   * @param updateFn The function that will update the disabled state for the controller.
   */
  updateDisableState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the touched state of the controller.
   * @param touched The new touched state for the controller.
   */
  setTouchedState(touched: boolean): void;
  /**
   * Update the touched state of the controller.
   * @param updateFn The function that will update the touched state for the controller.
   */
  updateTouchedState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the untouched state of the controller.
   * @param untouched The new untouched state for the controller.
   */
  setUntouchedState(untouched: boolean): void;
  /**
   * Update the untouched state of the controller.
   * @param updateFn The function that will update the untouched state for the controller.
   */
  updateUntouchedState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the dirty state of the controller.
   * @param dirty The new dirty state for the controller.
   */
  setDirtyState(dirty: boolean): void;
  /**
   * Update the dirty state of the controller.
   * @param updateFn The function that will update the dirty state for the controller.
   */
  updateDirtyState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the pristine state of the controller.
   * @param pristine The new pristine state for the controller.
   */
  setPristineState(pristine: boolean): void;
  /**
   * Update the pristine state of the controller.
   * @param updateFn The function that will update the pristine state for the controller.
   */
  updatePristineState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the valid state of the controller.
   * @param valid The new valid state for the controller.
   */
  setValidState(valid: boolean): void;
  /**
   * Update the valid state of the controller.
   * @param updateFn The function that will update the valid state for the controller.
   */
  updateValidState(updateFn: UpdateValueFn<boolean>): void;
  /**
   * Update the invalid state of the controller.
   * @param invalid The new invalid state for the controller.
   */
  setInvalidState(invalid: boolean): void;
  /**
   * Update the invalid state of the controller.
   * @param updateFn The function that will update the invalid state for the controller.
   */
  updateInvalidState(updateFn: UpdateValueFn<boolean>): void;
}
