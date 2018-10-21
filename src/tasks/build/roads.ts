export default () => {
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
