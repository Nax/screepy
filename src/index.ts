import '@babel/polyfill';

import runTasks from './tasks';
import harvest from './harvest';
import upgrade from './upgrade';
import build from './build';
import creepManager from './creep-manager';
import { CREEP_ROLE_HARVESTER, CREEP_ROLE_UPGRADER, CREEP_ROLE_BUILDER } from './creep/roles';

export const loop = () => {
  runTasks();
  creepManager();
  for (let creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    switch (creep.memory.role) {
    case CREEP_ROLE_HARVESTER:
      harvest(creep);
      break;
    case CREEP_ROLE_UPGRADER:
      upgrade(creep);
      break;
    case CREEP_ROLE_BUILDER:
      build(creep);
      break;
    default:
      console.log(`Warning: creep ${creep.name} has no job.`);
      break;
    }
  }
};
