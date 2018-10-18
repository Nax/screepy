import '@babel/polyfill';

import autobuild from './autobuild';
import harvest from './harvest';
import upgrade from './upgrade';
import build from './build';
import creepManager from './creep-manager';
import { CREEP_ROLE_HARVESTER, CREEP_ROLE_UPGRADER, CREEP_ROLE_BUILDER } from './creep/roles';

let tick = 0;

export const loop = () => {
  tick = (tick + 1) % 10000;
  if ((tick % 20) === 0) {
    autobuild();
  }
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
