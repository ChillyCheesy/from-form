import { Observable, combineLatest, first, map } from 'rxjs';
import { FrmControlConfig, FrmController, FrmGroupConfig, Operable, UpdateValueFn } from '../models';

/**
 * The GroupFrmController class represents the control of the form.
 */
export class GroupFrmController<T> implements FrmController<T> {

  public constructor(
    private readonly controllers: FrmGroupConfig<T>,
    public readonly config: Operable<FrmControlConfig<T>>
  ) { }

  public get(key: keyof T): FrmController<T[keyof T]> {
    return this.controllers[key];
  }

  public writeValue(value: T | undefined): void {
    const keys: (keyof T)[] = Object.keys(value ?? {}) as (keyof T)[];
    for (const key of keys) {
      const controller: FrmController<T[keyof T]> = this.get(key);
      const result: T[keyof T] | undefined = value?.[key];
      controller.writeValue(result);
    }
  }

  public updateValue(updateFn: UpdateValueFn<T | undefined>): void {
    const result$: Observable<T | undefined> = this.value$.pipe(first(), map(updateFn));
    result$.subscribe((result: T | undefined) => this.writeValue(result));
  }

  public setEnableState(enable: boolean): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.setEnableState(enable);
    }
  }

  public updateEnableState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updateEnableState(updateFn);
    }
  }

  public setDisableState(disable: boolean): void {
    this.setEnableState(!disable);
  }

  public updateDisableState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updateDisableState(updateFn);
    }
  }

  public setTouchedState(touched: boolean): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.setTouchedState(touched);
    }
  }

  public updateTouchedState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updateTouchedState(updateFn);
    }
  }

  public setUntouchedState(untouched: boolean): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.setUntouchedState(untouched);
    }
  }

  public updateUntouchedState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updateUntouchedState(updateFn);
    }
  }

  public setDirtyState(dirty: boolean): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.setDirtyState(dirty);
    }
  }

  public updateDirtyState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updateDirtyState(updateFn);
    }
  }

  public setPristineState(pristine: boolean): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.setPristineState(pristine);
    }
  }

  public updatePristineState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updatePristineState(updateFn);
    }
  }

  public setValidState(valid: boolean): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.setValidState(valid);
    }
  }

  public updateValidState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updateValidState(updateFn);
    }
  }

  public setInvalidState(invalid: boolean): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.setInvalidState(invalid);
    }
  }

  public updateInvalidState(updateFn: UpdateValueFn<boolean>): void {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    for (const controller of controllers) {
      controller.updateInvalidState(updateFn);
    }
  }

  public get value$(): Observable<T | undefined> {
    type Entries = [keyof T, FrmController<T[keyof T]>][];
    const entries: Entries = Object.entries(this.controllers) as Entries;
    return combineLatest(entries.map(([key, controller]) => controller.value$.pipe(
      map((value) => ({ [key]: value }) as { [key in keyof T]: T[key] }),
    ))).pipe(
      map((values) => values.reduce((acc, value) => Object.assign(acc, value), {} as T)),
    );
  };

  public get enable$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.enable$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  };

  public get disable$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.disable$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  };

  public get touched$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.touched$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  };

  public get untouched$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.untouched$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  };

  public get dirty$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.dirty$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  };

  public get pristine$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.pristine$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  }

  public get valid$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.valid$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  }

  public get invalid$(): Observable<boolean> {
    const controllers: FrmController<T[keyof T]>[] = Object.values(this.controllers);
    return combineLatest(controllers.map((controller) => controller.invalid$)).pipe(
      map((values: boolean[]) => values.every((value: boolean) => value))
    );
  }

}
