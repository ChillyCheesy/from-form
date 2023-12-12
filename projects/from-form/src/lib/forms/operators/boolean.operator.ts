import { Observable, combineLatest, map } from 'rxjs';
import { FrmContext, FrmOperation } from '../models';

export function and(...args: FrmOperation<boolean>[]): FrmOperation<boolean> {
  return (form: FrmContext) => {
    const results: Observable<boolean>[] = args.map(arg => arg(form));
    return combineLatest(results).pipe(
      map(results => results.every(result => result))
    );
  }
}

export function or(...args: FrmOperation<boolean>[]): FrmOperation<boolean> {
  return (form: FrmContext) => {
    const results: Observable<boolean>[] = args.map(arg => arg(form));
    return combineLatest(results).pipe(
      map(results => results.some(result => result))
    );
  }
}

export function not(arg: FrmOperation<boolean>): FrmOperation<boolean> {
  return (form: FrmContext) => arg(form).pipe(map(result => !result));
}
