import { CREEP_ACTION_LOAD, CREEP_ACTION_STORE } from './creep/actions';

export default (creep:Creep) => {
  if (!creep.memory.action) {
    creep.memory.action = CREEP_ACTION_LOAD;
  }
  if (creep.memory.action === CREEP_ACTION_LOAD) {
    const target = creep.pos.findClosestByPath(FIND_SOURCES);
    if (target && creep.harvest(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.action = CREEP_ACTION_STORE;
    }
  } else if (creep.memory.action === CREEP_ACTION_STORE) {
    const target = creep.room.controller;
    if (target && creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
    if (creep.carry.energy <= 0) {
      creep.memory.action = CREEP_ACTION_LOAD;
    }
  }
}
