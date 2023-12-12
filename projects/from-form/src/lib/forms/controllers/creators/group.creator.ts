
import { GroupFrmController } from '..';
import { FrmControlConfig, FrmController, FrmGroupConfig, Operable } from '../../models';
import { use } from '../../operators';

/**
 * Build a group controller.
 *
 * @param groupConfig The configuration of the group.
 * @param controlConfig The configuration of the controller.
 * @returns The group controller.
 */
export function createGroupController<T>(groupConfig: FrmGroupConfig<T>, controlConfig: Partial<Operable<FrmControlConfig<T>>> = {}): GroupFrmController<T> {
  const fullConfig: Operable<FrmControlConfig<T>> = Object.assign({
    value: use(undefined),
    hide: use(false),
    disabled: use(false),
    validators: use([]),
    contextData: use({}),
  }, controlConfig);
  const keys: (keyof T)[] = Object.keys(groupConfig) as (keyof T)[];
  for (const key of keys) {
    const controller: FrmController<T[keyof T]> = groupConfig[key];
    controller.name = key;
  }
  return new GroupFrmController<T>(groupConfig, fullConfig);
}
