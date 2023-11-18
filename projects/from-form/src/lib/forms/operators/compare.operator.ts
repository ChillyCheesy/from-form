import { Observable, combineLatest, map, of } from 'rxjs';
import { FromFormFn } from '../models/form-form-function.model';
import { FromFormAccessor } from '../models/from-form.model';

export type ValuesComparators = '==' | '!=' | '===' | '!==' | '<' | '<=' | '>' | '>=';
export type ListsComparators = 'in' | 'not in';
export type Comparators = ValuesComparators | ListsComparators;
export type ComparedValue<T, C extends Comparators> = C extends ValuesComparators
  ? T
  : C extends ListsComparators
    ? T[]
    : never;

export function compare<T, C extends Comparators>(value1: FromFormFn<T>, comparator: C, value2: FromFormFn<ComparedValue<T, C>>): FromFormFn<boolean> {
  return (fromFrom: FromFormAccessor) => {
    const combinedValue: Observable<[T, ComparedValue<T, C>]> = combineLatest([value1(fromFrom), value2(fromFrom)]);
    switch (comparator) {
      case '==': return combinedValue.pipe(map(([v1, v2]) => v1 == v2));
      case '!=': return combinedValue.pipe(map(([v1, v2]) => v1 != v2));
      case '===': return combinedValue.pipe(map(([v1, v2]) => v1 === v2));
      case '!==': return combinedValue.pipe(map(([v1, v2]) => v1 !== v2));
      case '<': return combinedValue.pipe(map(([v1, v2]) => v1 < v2));
      case '<=': return combinedValue.pipe(map(([v1, v2]) => v1 <= v2));
      case '>': return combinedValue.pipe(map(([v1, v2]) => v1 > v2));
      case '>=': return combinedValue.pipe(map(([v1, v2]) => v1 >= v2));
      case 'in': return combinedValue.pipe(map(([v1, v2]) => (v2 as T[]).includes(v1)));
      case 'not in': return combinedValue.pipe(map(([v1, v2]) => !(v2 as T[]).includes(v1)));
      default: return of(false);
    }
  }
}

export function fieldValue<T>(fieldName: string): FromFormFn<T> {
  return (fromForm: FromFormAccessor) => fromForm.onFromFormValueChange(fieldName);
}
