import { Type } from '@angular/core';
import { FrmContext, FrmController, Operable } from '../../models';
import { createController } from '../creators';

/**
 * The context builder is used to build a context.
 */
export class ContextBuilder implements FrmContext {

  /**
   * The name of the context.
   * By default, the name is 'root'.
   *
   * @private
   * @type {string}
   * @memberof ContextBuilder
   */
  private _contextName: string = 'root';
  /**
   * The form controller of the context.
   * By default, the form controller is an empty form controller.
   *
   * @private
   * @type {FrmController<any>}
   * @memberof ContextBuilder
   */
  private _frmController: FrmController<any> = createController({});
  /**
   * The parent context of the context.
   *
   * @private
   * @type {(FrmContext | undefined)}
   * @memberof ContextBuilder
   */
  private _parentFrmContext?: FrmContext | undefined;
  /**
   * The context data of the context.
   *
   * @private
   * @type {(Operable<{ [key: string]: any; }> | undefined)}
   * @memberof ContextBuilder
   */
  private _contextData?: Operable<{ [key: string]: any; }> | undefined;

  /**
   * Set the name of the context.
   * @param contextName The name of the context.
   * @returns The context builder.
   */
  public setContextName(contextName: string): ContextBuilder {
    this._contextName = contextName;
    return this;
  }

  /**
   * Set the form controller of the context.
   * @param frmController The form controller of the context.
   * @returns The context builder.
   */
  public setFrmController(frmController: FrmController<any>): ContextBuilder {
    this._frmController = frmController;
    return this;
  }

  /**
   * Set the parent context of the context.
   * @param parentFrmContext The parent context of the context.
   * @returns The context builder.
   */
  public setParentFrmContext(parentFrmContext: FrmContext): ContextBuilder {
    this._parentFrmContext = parentFrmContext;
    return this;
  }

  /**
   * Set the context data of the context.
   * @param contextData The context data of the context.
   * @returns The context builder.
   */
  public setContextData(contextData: Operable<{ [key: string]: any; }>): ContextBuilder {
    this._contextData = contextData;
    return this;
  }

  /**
   * Get the name of the context.
   *
   * @readonly
   * @type {string}
   * @memberof ContextBuilder
   */
  public get contextName(): string {
    return this._contextName;
  }

  /**
   * Get the form controller of the context.
   *
   * @readonly
   * @type {FrmController<any>}
   * @memberof ContextBuilder
   */
  public get frmController(): FrmController<any> {
    return this._frmController;
  }

  /**
   * Get the parent context of the context.
   *
   * @readonly
   * @type {(FrmContext | undefined)}
   * @memberof ContextBuilder
   */
  public get parentFrmContext(): FrmContext | undefined {
    return this._parentFrmContext;
  }

  /**
   * Get the context data of the context.
   *
   * @readonly
   * @type {(Operable<{ [key: string]: any; }> | undefined)}
   * @memberof ContextBuilder
   */
  public get contextData(): Operable<{ [key: string]: any; }> | undefined {
    return this._contextData;
  }

  /**
   * Build the context.
   * @param type The type of the context.
   * @returns The context.
   */
  public build<T extends FrmContext>(type: Type<T>): T {
    return new type(this._contextName, this._frmController, this._parentFrmContext, this._contextData);
  }

}
