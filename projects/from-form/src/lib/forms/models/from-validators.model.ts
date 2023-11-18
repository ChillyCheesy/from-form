import { Observable } from 'rxjs';

export type FrmValidatorFn<T> = (value: T | undefined) => Observable<boolean>;
