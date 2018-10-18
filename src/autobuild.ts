const createRoads = () => {
  const spawn = Game.spawns['MainSpawn'];
  const room = spawn.room;
  const terrain = room.getTerrain();
  const sources = room.find(FIND_SOURCES);
  const controllers = room.controller ? [room.controller] : [];

  const targets = [
    ...sources,
    ...controllers
  ];

  targets.forEach((target) => {
    const path = spawn.pos.findPathTo(target, {
      ignoreCreeps: true,
      ignoreRoads: true
    });
    path.forEach((p) => {
      if (terrain.get(p.x, p.y) !== TERRAIN_MASK_WALL) {
        room.createConstructionSite(p.x, p.y, STRUCTURE_ROAD);
      }
    });
  });
};

const createExtensions = () => {
  const spawn = Game.spawns['MainSpawn'];
  const room = spawn.room;
  const terrain = room.getTerrain();
  const candidates = [];

  for (let dx = -3; dx <= 3; ++dx) {
    for (let dy = -3; dy <= 3; ++dy) {
      const x = spawn.pos.x + dx;
      const y = spawn.pos.y + dy;

      if (terrain.get(x, y) === TERRAIN_MASK_WALL) continue;
      if (room.lookForAt(LOOK_STRUCTURES, x, y).length > 0) continue;
      if (room.lookForAt(LOOK_CONSTRUCTION_SITES, x, y).length > 0) continue;

      candidates.push([x, y]);
    }
  }

  candidates.sort((a, b) => {
    const distA = Math.pow(spawn.pos.x - a[0], 2) + Math.pow(spawn.pos.y - a[1], 2);
    const distB = Math.pow(spawn.pos.x - b[0], 2) + Math.pow(spawn.pos.y - b[1], 2);
    return (distA - distB);
  });

  for (let i in candidates) {
    const pos = candidates[i];
    if (room.createConstructionSite(pos[0], pos[1], STRUCTURE_EXTENSION)) break;
  }
};

export default () => {
  createRoads();
  createExtensions();
};
