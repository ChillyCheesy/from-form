/**
 * FromControllerAccessor interface is used to implement the ControlValueAccessor interface.
 * This interface is used to create a custom form control.
 */
export interface FromControllerAccessor<T> {
  /**
   * This method is used to write a value to the form control.
   * @param value The value to write to the form control.
   */
  writeValue(value: T | undefined): void;
  /**
   * This method is used to register a callback function that is called when the value of the form control changes.
   * @param fn The callback function to register.
   */
  registerOnChange(fn: (value: T) => void): void;
  /**
   * This method is used to register a callback function that is called when the form control is touched.
   * @param fn The callback function to register.
   */
  registerOnTouched(fn: () => void): void;
  /**
   * This method is used to set the disabled state of the form control.
   * @param isDisabled The disabled state to set.
   */
  setDisabledState(isDisabled: boolean): void;
}
