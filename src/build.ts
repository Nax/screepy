import { CREEP_ACTION_LOAD, CREEP_ACTION_STORE } from "./creep/actions";

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
    let target:ConstructionSite|null = null;
    [STRUCTURE_EXTENSION, STRUCTURE_ROAD].forEach((type) => {
      if (!target) {
        target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {filter: (obj) => {
          return (obj.structureType === type);
        }});
      }
    });

    if (target && creep.build(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
    if (creep.carry.energy <= 0) {
      creep.memory.action = CREEP_ACTION_LOAD;
    }
  }
};
