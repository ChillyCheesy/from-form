import { SimpleFrmController } from '../controllers';
import { FrmController, OperableFrmControlConfig } from '../models';
import { use } from '../operators';

export function buildController<T>(config: Partial<OperableFrmControlConfig<T>>): FrmController<T> {
  const fullConfig: OperableFrmControlConfig<T> = Object.assign({
    value: use(undefined),
    hide: use(false),
    disabled: use(false),
    validators: use([]),
    contextData: use({}),
  }, config);
  return new SimpleFrmController<T>(fullConfig);
}
