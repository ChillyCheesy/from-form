import { Observable, of } from 'rxjs';
import { FromFormFn } from '../models/form-form-function.model';
import { FromForm, FromFormAccessor } from '../models/from-form.model';
import { and, not, or } from './boolean.operator';

class AccessorMock implements FromFormAccessor {
  fromForm: FromForm = { };
  onFromFormValueChange<T>(key: string): Observable<T> {
    throw new Error(`Control ${key} not found`);
  }
}

describe('The comparing operator', () => {

  describe('"and"', () => {

    it('should return true if all values are true', (done) => {
      const args: FromFormFn<boolean>[] = [
        () => of(true),
        () => of(true),
        () => of(true),
      ];
      const result: FromFormFn<boolean> = and(...args);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('should return false if one value is false', (done) => {
      const args: FromFormFn<boolean>[] = [
        () => of(true),
        () => of(false),
        () => of(true),
      ];
      const result: FromFormFn<boolean> = and(...args);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeFalse();
        done();
      });
    });

    it('should return false if all values are false', (done) => {
      const args: FromFormFn<boolean>[] = [
        () => of(false),
        () => of(false),
        () => of(false),
      ];
      const result: FromFormFn<boolean> = and(...args);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeFalse();
        done();
      });
    });

  });

  describe('"or"', () => {

    it('should return true if all values are true', (done) => {
      const args: FromFormFn<boolean>[] = [
        () => of(true),
        () => of(true),
        () => of(true),
      ];
      const result: FromFormFn<boolean> = or(...args);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('should return true if one value is true', (done) => {
      const args: FromFormFn<boolean>[] = [
        () => of(false),
        () => of(false),
        () => of(true),
      ];
      const result: FromFormFn<boolean> = or(...args);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('should return false if all values are false', (done) => {
      const args: FromFormFn<boolean>[] = [
        () => of(false),
        () => of(false),
        () => of(false),
      ];
      const result: FromFormFn<boolean> = or(...args);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeFalse();
        done();
      });
    });

  });

  describe('"not"', () => {

    it('should return true if the value is false', (done) => {
      const arg: FromFormFn<boolean> = () => of(false);
      const result: FromFormFn<boolean> = not(arg);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('should return false if the value is true', (done) => {
      const arg: FromFormFn<boolean> = () => of(true);
      const result: FromFormFn<boolean> = not(arg);
      result(new AccessorMock()).subscribe(value => {
        expect(value).toBeFalse();
        done();
      });
    });

  });

});
