import { BehaviorSubject, Observable, map } from 'rxjs';
import { FrmControlConfig, FrmController } from '../models/from-controller.model';
import { Operable, UpdateValueFn } from '../models/from-operator.model';

export class SimpleFrmController<T> implements FrmController<T> {

  private _value: BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
  private _enable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _touched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _dirty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _valid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor(
    public config: Operable<FrmControlConfig<T>>
  ) { }

  public writeValue(value: T | undefined): void {
    this._value.next(value);
  }

  public updateValue(updateFn: UpdateValueFn<T | undefined>): void {
    this.writeValue(updateFn(this._value.getValue()));
  }

  public setEnableState(enable: boolean): void {
    this._enable.next(enable);
  }

  public updateEnableState(updateFn: UpdateValueFn<boolean>): void {
    this.setEnableState(updateFn(this._enable.getValue()));
  }

  public setDisableState(disable: boolean): void {
    this.setEnableState(!disable);
  }

  public updateDisableState(updateFn: UpdateValueFn<boolean>): void {
    this.setDisableState(updateFn(this._enable.getValue()));
  }

  public setTouchedState(touched: boolean): void {
    this._touched.next(touched);
  }

  public updateTouchedState(updateFn: UpdateValueFn<boolean>): void {
    this.setTouchedState(updateFn(this._touched.getValue()));
  }

  public setUntouchedState(untouched: boolean): void {
    this.setTouchedState(!untouched);
  }

  public updateUntouchedState(updateFn: UpdateValueFn<boolean>): void {
    this.setUntouchedState(updateFn(this._touched.getValue()));
  }

  public setDirtyState(dirty: boolean): void {
    this._dirty.next(dirty);
  }

  public updateDirtyState(updateFn: UpdateValueFn<boolean>): void {
    this.setDirtyState(updateFn(this._dirty.getValue()));
  }

  public setPristineState(pristine: boolean): void {
    this.setDirtyState(!pristine);
  }

  public updatePristineState(updateFn: UpdateValueFn<boolean>): void {
    this.setPristineState(updateFn(this._dirty.getValue()));
  }

  public setValidState(valid: boolean): void {
    this._valid.next(valid);
  }

  public updateValidState(updateFn: UpdateValueFn<boolean>): void {
    this.setValidState(updateFn(this._valid.getValue()));
  }

  public setInvalidState(invalid: boolean): void {
    this.setValidState(!invalid);
  }

  public updateInvalidState(updateFn: UpdateValueFn<boolean>): void {
    this.setInvalidState(updateFn(this._valid.getValue()));
  }

  public get value$(): Observable<T | undefined> {
    return this._value.asObservable();
  };

  /**
   * The enabled state of the control.
   * It is used to represent the enabled state in real time.
   * The state return true if the control is enabled, otherwise false.
   */
  public get enable$(): Observable<boolean> {
    return this._enable.asObservable();
  };

  /**
   * The disabled state of the control.
   * It is used to represent the disabled state in real time.
   * The state return true if the control is disabled, otherwise false.
   */
  public get disable$(): Observable<boolean> {
    return this.enable$.pipe(map(enable => !enable));
  };

  /**
   * The touched state of the control.
   * It is used to represent the touched state in real time.
   * The state return true if the user has interacted with the form control, e.g., by clicking or focusing on it.
   */
  public get touched$(): Observable<boolean> {
    return this._touched.asObservable();
  };

  /**
   * The untouched state of the control.
   * It is used to represent the untouched state in real time.
   * The state return true if the user has not yet interacted with the form control, e.g., by clicking or focusing on it.
   */
  public get untouched$(): Observable<boolean> {
    return this.touched$.pipe(map(touched => !touched));
  };

  /**
   * The dirty state of the control.
   * It is used to represent the dirty state in real time.
   * The state return true if the user has changed the value of the control.
   */
  public get dirty$(): Observable<boolean> {
    return this._dirty.asObservable();
  };

  /**
   * The pristine state of the control.
   * It is used to represent the pristine state in real time.
   * The state return true if the user has not yet changed the value of the control.
   */
  public get pristine$(): Observable<boolean> {
    return this.dirty$.pipe(map(dirty => !dirty));
  }

  /**
   * The valid state of the control.
   * It is used to represent the valid state in real time.
   * The state return true if the control has passed all validation checks, otherwise false.
   */
  public get valid$(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  /**
   * The invalid state of the control.
   * It is used to represent the invalid state in real time.
   * The state return true if the control has failed any of the validation checks, otherwise false.
   */
  public get invalid$(): Observable<boolean> {
    return this.valid$.pipe(map(valid => !valid));
  }

}

