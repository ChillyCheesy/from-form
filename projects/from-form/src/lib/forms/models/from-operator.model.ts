import { Observable } from 'rxjs';
import { FrmContext } from './from-context.model';

export type FrmOperation<R> = (accessor: FrmContext) => Observable<R>;

export type Operable<T> = {
  [P in keyof T]: FrmOperation<T[P]>;
}

export type UpdateValueFn<T> = (value: T) => T;
