import { FromControllerAccessor } from '../models';

export class HTMLInputAccessor<T> implements FromControllerAccessor<T> {

  private _onChange: (value: T) => void = () => {};
  private _onTouched: () => void = () => {};

  public constructor(private readonly _element: HTMLInputElement) {
    this._element.addEventListener('input', () => this._onChange(this._element.value as any));
    this._element.addEventListener('blur', this._onTouched);
  }

  public writeValue(value: T): void {
    if (value === null || value === undefined) this._element.value = '';
    else this._element.value = value as any;
  }

  public registerOnChange(fn: (value: T) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._element.disabled = isDisabled;
  }
}
