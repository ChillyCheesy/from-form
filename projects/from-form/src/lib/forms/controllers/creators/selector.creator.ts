import { FrmSelectorConfig, Operable } from '../../models';
import { use } from '../../operators';
import { FrmSelectorController } from '../selector.controller';

export function createSelector<T>(config: Partial<Operable<FrmSelectorConfig<T>>>): FrmSelectorController<T> {
  const fullConfig: Operable<FrmSelectorConfig<T>> = Object.assign({
    value: use(undefined),
    hide: use(false),
    disabled: use(false),
    validators: use([]),
    contextData: use({}),
    options: use([]),
  }, config);
  return new FrmSelectorController<T>(fullConfig);
}
