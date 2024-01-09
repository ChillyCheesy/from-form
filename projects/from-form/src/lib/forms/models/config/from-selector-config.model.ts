import { FrmControlConfig } from './from-controller-config.model';

/**
 * The FrmSelectorOption interface represents the option of the selector.
 */
export interface FrmSelectorOption<T> {
  /**
   * The value of the option.
   */
  value: T;
  /**
   * The label of the option.
   * If the label is not specified, the value is used as the label.
   */
  label?: string;
}

/**
 * The FrmSelectorConfig interface represents the configuration of the selector.
 * It is used to create the selector.
 * The selector is a control that allows you to select a value from a list of values.
 *
 * @extends FrmControlConfig<T> The configuration of the control.
 */
export interface FrmSelectorConfig<T> extends FrmControlConfig<T> {
  options: FrmSelectorOption<T>[];
}

