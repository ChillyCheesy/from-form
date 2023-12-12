import { SimpleFrmController } from '..';
import { FrmControlConfig, FrmController, Operable } from '../../models';
import { use } from '../../operators';

/**
 * Build a controller.
 *
 * @param config The configuration of the controller.
 * @returns The controller.
 */
export function createController<T>(config: Partial<Operable<FrmControlConfig<T>>>): FrmController<T> {
  const fullConfig: Operable<FrmControlConfig<T>> = Object.assign({
    value: use(undefined),
    hide: use(false),
    disabled: use(false),
    validators: use([]),
    contextData: use({}),
  }, config);
  return new SimpleFrmController<T>(fullConfig);
}
