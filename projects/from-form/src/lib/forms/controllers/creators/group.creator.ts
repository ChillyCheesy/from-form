
import { GroupFrmController } from '..';
import { FrmControlConfig, FrmGroupConfig, Operable } from '../../models';
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
  for (const key in groupConfig) {
    const controller: FrmGroupConfig<T>[Extract<keyof T, string>] = groupConfig[key];
    controller.name = key;
  }
  return new GroupFrmController<T>(groupConfig, fullConfig);
}
