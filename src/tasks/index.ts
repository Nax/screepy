import buildRoads from './build/roads';
import buildExtensions from './build/extensions';
import creepReap from './creep/reap';

interface ITask {
  task:() => void,
  period:number;
};

interface IComputedTask extends ITask {
  skew:number;
};

const combineTasks = (tasks:ITask[]) => {
  const taskTable:IComputedTask[] = [];

  for (let t of tasks) {
    const computed:IComputedTask = {
      task: t.task,
      period: t.period,
      skew: taskTable.length % t.period
    };

    taskTable.push(computed);
  }

  return () => {
    const tick = Game.time;
    for (let task of taskTable) {
      if (tick % task.period === task.skew) {
        task.task();
      }
    }
  };
}

export default combineTasks([
  { task: buildRoads, period: 10 },
  { task: buildExtensions, period: 20 },
  { task: creepReap, period: 100 }
]);
