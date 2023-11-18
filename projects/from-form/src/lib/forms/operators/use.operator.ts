import { EMPTY, Observable, from, of, switchMap } from 'rxjs';
import { FrmContext, FrmOperation } from '../models';

export function use<T>(value: T): FrmOperation<T> {
  return () => of(value);
}

export function useFrom<T>(value: Promise<T> | Observable<T>): FrmOperation<T> {
  return () => from(value);
}

export type UseIfOptions<T> = {
  if: FrmOperation<boolean>;
  then: FrmOperation<T>;
  else?: FrmOperation<T>;
};

export function useIf<T>(options: UseIfOptions<T>): FrmOperation<T> {
  return (fromFormAccessor: FrmContext) => options.if(fromFormAccessor).pipe(
    switchMap((condition: boolean) => {
      if (condition) return options.then(fromFormAccessor);
      return options.else ? options.else(fromFormAccessor) : EMPTY;
    })
  );
}

export type UseWhenOptions<T> = {
  when: FrmOperation<string | symbol | number>;
  cases: { [key: string | symbol | number ]: FrmOperation<T>; };
  default?: FrmOperation<T>;
};

export function useWhen<T>(options: UseWhenOptions<T>): FrmOperation<T> {
  return (fromFormAccessor: FrmContext) => options.when(fromFormAccessor).pipe(
    switchMap((key: string | symbol | number) => {
      if (options.cases[key]) return options.cases[key](fromFormAccessor);
      return options.default ? options.default(fromFormAccessor) : EMPTY;
    })
  );
}
