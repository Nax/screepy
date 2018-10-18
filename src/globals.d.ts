import * as CreepActions from './creep/actions';
import * as CreepRoles from './creep/roles';

declare global {
  type CreepAction =
    | typeof CreepActions.CREEP_ACTION_NONE
    | typeof CreepActions.CREEP_ACTION_LOAD
    | typeof CreepActions.CREEP_ACTION_STORE;

  type CreepRole =
    | typeof CreepRoles.CREEP_ROLE_NONE
    | typeof CreepRoles.CREEP_ROLE_HARVESTER
    | typeof CreepRoles.CREEP_ROLE_BUILDER
    | typeof CreepRoles.CREEP_ROLE_UPGRADER;

  interface CreepMemory {
    action: CreepAction;
    role: CreepRole;
  }
}
