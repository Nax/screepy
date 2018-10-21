export default () => {
  if (!Memory.creeps) return;

  for (let creepName in Memory.creeps) {
    if (Game.creeps[creepName] === undefined) {
      delete Memory.creeps[creepName];
    }
  }
};
