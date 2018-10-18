import { CREEP_ROLE_HARVESTER, CREEP_ROLE_BUILDER, CREEP_ROLE_UPGRADER } from './creep/roles';
import { CREEP_ACTION_NONE } from './creep/actions';

const TEMPLATES = new Map<CreepRole>([
  [CREEP_ROLE_HARVESTER, {
    count: 12,
    bodyParts: [WORK, WORK, CARRY, MOVE],
  }],
  [CREEP_ROLE_BUILDER, {
    count: 6,
    bodyParts: [WORK, WORK, CARRY, MOVE],
  }],
  [CREEP_ROLE_UPGRADER, {
    count: 6,
    bodyParts: [WORK, WORK, CARRY, MOVE],
  }]
]);

const ALPHABET = "0123456789abcdef";

const randTag = () => {
  const chars = [];
  for (let i = 0; i < 8; ++i) {
    chars.push(ALPHABET[Math.floor(Math.random() * 16)]);
  }
  return chars.join('');
};

export default () => {
  const counts: Map<CreepRole, number> = new Map;
  for (let name in Game.creeps) {
    const creep = Game.creeps[name];
    const role = creep.memory.role;
    counts.set(role, (counts.get(role) || 0) + 1);
  }
  const roles = [...TEMPLATES.keys()];
  roles.sort((a, b) => (
    ((counts.get(a) || 0) + 1) / (TEMPLATES.get(a)!.count + 1)
    - ((counts.get(b) || 0) + 1) / (TEMPLATES.get(b)!.count + 1)
  ));

  const role = roles[0];
  if ((counts.get(role) || 0) < TEMPLATES.get(role)!.count) {
    const spawn = Game.spawns['MainSpawn']
    if (spawn) {
      spawn.spawnCreep(TEMPLATES.get(role)!.bodyParts, role + '-' + randTag(), {
        memory: {
          action: CREEP_ACTION_NONE,
          role
        }
      });
    }
  }
};
