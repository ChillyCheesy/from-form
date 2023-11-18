import { Observable, isEmpty, of } from 'rxjs';
import { FromFormFn } from '../models/form-form-function.model';
import { FromForm, FromFormAccessor } from '../models/from-form.model';
import { use, useFrom, useIf, useWhen } from './use.operator';

class AccessorMock implements FromFormAccessor {
  fromForm: FromForm = { };
  onFromFormValueChange<T>(key: string): Observable<T> {
    throw new Error(`Control ${key} not found`);
  }
}

describe('The use operator', () => {

  describe('"use"', () => {
    it('should return a function that returns an observable of the given value', (done) => {
      const value: string = 'wicket';
      const result: FromFormFn<string> = use(value);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('wicket');
        done();
      });
    });
  });

  describe('"useFrom"', () => {

    it('should return a function that returns an observable of the given value inside a Promise', (done) => {
      const value: Promise<string> = Promise.resolve('Graak');
      const result: FromFormFn<string> = useFrom(value);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('Graak');
        done();
      });
    });

    it('should return a function that returns an observable of the given value inside an Observable', (done) => {
      const value$: Observable<string> = of('Benoit');
      const result: FromFormFn<string> = useFrom(value$);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('Benoit');
        done();
      });
    });

  });

  describe('"useIf"', () => {

    it('should return a function that returns an observable of the "then" value if the "if" value is true', (done) => {
      const result: FromFormFn<string> = useIf({
        if: () => of(true),
        then: () => of('then'),
      });
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('then');
        done();
      });
    });

    it('should return a function that returns an observable of the "else" value if the "if" value is false', (done) => {
      const result: FromFormFn<string> = useIf({
        if: () => of(false),
        then: () => of('then'),
        else: () => of('else'),
      });
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('else');
        done();
      });
    });

    it('should return a function that returns an EMPTY observable if the "if" value is false and there is no "else" value', (done) => {
      const result: FromFormFn<string> = useIf({
        if: () => of(false),
        then: () => of('then'),
      });
      result(new AccessorMock()).pipe(isEmpty()).subscribe(value => {
        expect(value).toBeTrue();
        done();
      });
    });

  });

  describe('"useWhen"', () => {

    it('should return a function that returns an observable that emit "foo" value if the "when" value is matching', (done) => {
      const result: FromFormFn<string> = useWhen({
        when: () => of('foo'),
        cases: {
          foo: () => of('foo'),
          bar: () => of('bar'),
        },
      });
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('foo');
        done();
      });
    });

    it('should return a function that returns an observable that emit "bar" value if the "when" value is matching', (done) => {
      const result: FromFormFn<string> = useWhen({
        when: () => of('bar'),
        cases: {
          foo: () => of('foo'),
          bar: () => of('bar'),
        },
      });
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('bar');
        done();
      });
    });

    it('should return a function that returns an EMPTY observable if the "when" value is not matching and there is no default value', (done) => {
      const result: FromFormFn<string> = useWhen({
        when: () => of('baz'),
        cases: {
          foo: () => of('foo'),
          bar: () => of('bar'),
        },
      });
      result(new AccessorMock()).pipe(isEmpty()).subscribe(value => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('should return a function that returns an observable that emit "baz" value if the "when" value is not matching', (done) => {
      const result: FromFormFn<string> = useWhen({
        when: () => of('baz'),
        cases: {
          foo: () => of('foo'),
          bar: () => of('bar'),
        },
        default: () => of('baz'),
      });
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('baz');
        done();
      });
    });

    it('should return "Benoit" value if the "when" value is matching', (done) => {
      const result: FromFormFn<string> = useWhen({
        when: () => of(0),
        cases: {
          0: () => of('Benoit'),
          Ben: () => of('Jean-Mario'),
        },
      });
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('Benoit');
        done();
      });
    });

    it('should return "Jean-Mario" value if the "when" value is matching', (done) => {
      const result: FromFormFn<string> = useWhen({
        when: () => of(-1),
        cases: {
          0: () => of('Benoit'),
          '-1': () => of('Jean-Mario'),
        },
      });
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBe('Jean-Mario');
        done();
      });
    });

  });

});
