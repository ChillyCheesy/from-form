import { FrmController } from './from-controller.model';

export type FrmGroupConfig<T> = {
  [key in keyof T]: FrmController<T[key]>;
};
