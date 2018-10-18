export default (creep:Creep) => {
  if (creep.carry.energy < creep.carryCapacity) {
    const source = creep.pos.findClosestByPath(FIND_SOURCES);

    if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  } else {
    const spawn = Game.spawns['MainSpawn'];
    let target:Structure|null = null;
    if (spawn && spawn.energy < spawn.energyCapacity) {
      target = spawn;
    } else {
      target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (struct) => {
          return (struct instanceof StructureExtension && struct.energy < struct.energyCapacity);
        }
      });
    }
    if (target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
}
