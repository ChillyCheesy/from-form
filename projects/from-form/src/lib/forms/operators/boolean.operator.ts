import { Observable, combineLatest, map } from 'rxjs';
import { FromFormFn } from '../models/form-form-function.model';
import { FromFormAccessor } from '../models/from-form.model';

export function and(...args: FromFormFn<boolean>[]): FromFormFn<boolean> {
  return (form: FromFormAccessor) => {
    const results: Observable<boolean>[] = args.map(arg => arg(form));
    return combineLatest(results).pipe(
      map(results => results.every(result => result))
    );
  }
}

export function or(...args: FromFormFn<boolean>[]): FromFormFn<boolean> {
  return (form: FromFormAccessor) => {
    const results: Observable<boolean>[] = args.map(arg => arg(form));
    return combineLatest(results).pipe(
      map(results => results.some(result => result))
    );
  }
}

export function not(arg: FromFormFn<boolean>): FromFormFn<boolean> {
  return (form: FromFormAccessor) => arg(form).pipe(map(result => !result));
}
