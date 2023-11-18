import { Observable, map, of } from 'rxjs';
import { FromFormFn } from '../models/form-form-function.model';
import { FromForm, FromFormAccessor, FromFormControl } from '../models/from-form.model';
import { compare, fieldValue } from './compare.operator';

class AccessorMock implements FromFormAccessor {
  fromForm: FromForm = {
    field1: {
      value: () => of({ value: 'value' })
    },
    field2: {
      value: () => of({ value: 'wicket' })
    }
  };
  onFromFormValueChange<T>(key: string): Observable<T> {
    const control: Partial<FromFormControl<T>> = this.fromForm[key] as Partial<FromFormControl<T>>;
    if (control) {
      return control.value!(this).pipe(map(value => value.value));
    }
    throw new Error(`Control ${key} not found`);
  }
}

describe('The comparing operator', () => {

  describe('"fieldValue"', () => {

    let fromFormAccessor: FromFormAccessor = new AccessorMock();

    it('should return "value"', (done) => {
      const operator: FromFormFn<string> = fieldValue<string>('field1');
      operator(fromFormAccessor).subscribe(value => {
        expect(value).toBe('value');
        done();
      });
    });

    it('should return "wicket"', (done) => {
      const operator: FromFormFn<string> = fieldValue<string>('field2');
      operator(fromFormAccessor).subscribe(value => {
        expect(value).toBe('wicket');
        done();
      });
    });

  });

  describe('"compare"', () => {

    describe('with the "==" comparator', () => {

      it('should return true when it comparing "1" and 1', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<string | number, '=='>(value1, '==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "1" and 2', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<string | number, '=='>(value1, '==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "1" and "1"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('1');
        const operator: FromFormFn<boolean> = compare<string, '=='>(value1, '==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "1" and "2"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('2');
        const operator: FromFormFn<boolean> = compare<string, '=='>(value1, '==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

    });

    describe('with the "!=" comparator', () => {

      it('should return false when it comparing "1" and 1', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<string | number, '!='>(value1, '!=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "1" and 2', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<string | number, '!='>(value1, '!=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "1" and "1"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('1');
        const operator: FromFormFn<boolean> = compare<string, '!='>(value1, '!=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "1" and "2"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('2');
        const operator: FromFormFn<boolean> = compare<string, '!='>(value1, '!=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

    });

    describe('with the "===" comparator', () => {

      it('should return false when it comparing "1" and 1', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<string | number, '==='>(value1, '===', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return false when it comparing "1" and 2', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<string | number, '==='>(value1, '===', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "1" and "1"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('1');
        const operator: FromFormFn<boolean> = compare<string, '==='>(value1, '===', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return true when it comparing 1 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '==='>(value1, '===', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "1" and "2"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('2');
        const operator: FromFormFn<boolean> = compare<string, '==='>(value1, '===', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

    });

    describe('with the "!==" comparator', () => {

      it('should return true when it comparing "1" and 1', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<string | number, '!=='>(value1, '!==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return true when it comparing "1" and 2', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<string | number, '!=='>(value1, '!==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "1" and "1"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('1');
        const operator: FromFormFn<boolean> = compare<string, '!=='>(value1, '!==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return false when it comparing 1 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '!=='>(value1, '!==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "1" and "2"', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string> = () => of('2');
        const operator: FromFormFn<boolean> = compare<string, '!=='>(value1, '!==', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

    });

    describe('with the "<" comparator', () => {

      it('should return true when it comparing 1 and 2', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<number, '<'>(value1, '<', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing 2 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(2);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '<'>(value1, '<', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return false when it comparing 1 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '<'>(value1, '<', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "a" and "b"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('b');
        const operator: FromFormFn<boolean> = compare<string, '<'>(value1, '<', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "b" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('b');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '<'>(value1, '<', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return false when it comparing "a" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '<'>(value1, '<', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

    });

    describe('with the "<=" comparator', () => {

      it('should return true when it comparing 1 and 2', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<number, '<='>(value1, '<=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing 2 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(2);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '<='>(value1, '<=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing 1 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '<='>(value1, '<=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return true when it comparing "a" and "b"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('b');
        const operator: FromFormFn<boolean> = compare<string, '<='>(value1, '<=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "b" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('b');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '<='>(value1, '<=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "a" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '<='>(value1, '<=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

    });

    describe('with the ">" comparator', () => {

      it('should return false when it comparing 1 and 2', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<number, '>'>(value1, '>', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing 2 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(2);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '>'>(value1, '>', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing 1 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '>'>(value1, '>', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return false when it comparing "a" and "b"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('b');
        const operator: FromFormFn<boolean> = compare<string, '>'>(value1, '>', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "b" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('b');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '>'>(value1, '>', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "a" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '>'>(value1, '>', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

    });

    describe('with the ">=" comparator', () => {

      it('should return false when it comparing 1 and 2', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(2);
        const operator: FromFormFn<boolean> = compare<number, '>='>(value1, '>=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing 2 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(2);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '>='>(value1, '>=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return true when it comparing 1 and 1', (done) => {
        const value1: FromFormFn<number> = () => of(1);
        const value2: FromFormFn<number> = () => of(1);
        const operator: FromFormFn<boolean> = compare<number, '>='>(value1, '>=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "a" and "b"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('b');
        const operator: FromFormFn<boolean> = compare<string, '>='>(value1, '>=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "b" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('b');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '>='>(value1, '>=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return true when it comparing "a" and "a"', (done) => {
        const value1: FromFormFn<string> = () => of('a');
        const value2: FromFormFn<string> = () => of('a');
        const operator: FromFormFn<boolean> = compare<string, '>='>(value1, '>=', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

    });

    describe('with the "in" comparator', () => {

      it('should return true when it comparing "1" and ["1", "2"]', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string[]> = () => of(['1', '2']);
        const operator: FromFormFn<boolean> = compare<string, 'in'>(value1, 'in', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

      it('should return false when it comparing "3" and ["1", "2"]', (done) => {
        const value1: FromFormFn<string> = () => of('3');
        const value2: FromFormFn<string[]> = () => of(['1', '2']);
        const operator: FromFormFn<boolean> = compare<string, 'in'>(value1, 'in', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

    });

    describe('with the "not in" comparator', () => {

      it('should return false when it comparing "1" and ["1", "2"]', (done) => {
        const value1: FromFormFn<string> = () => of('1');
        const value2: FromFormFn<string[]> = () => of(['1', '2']);
        const operator: FromFormFn<boolean> = compare<string, 'not in'>(value1, 'not in', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(false);
          done();
        });
      });

      it('should return true when it comparing "3" and ["1", "2"]', (done) => {
        const value1: FromFormFn<string> = () => of('3');
        const value2: FromFormFn<string[]> = () => of(['1', '2']);
        const operator: FromFormFn<boolean> = compare<string, 'not in'>(value1, 'not in', value2);
        operator(new AccessorMock()).subscribe(value => {
          expect(value).toBe(true);
          done();
        });
      });

    });

  });

});
