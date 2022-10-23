import Dexie, { Table } from 'dexie';
import { TimerTypes } from '../../models/Timer';

export interface ProgramEntity {
  id?: number;
  name: string;
}
export interface TimerListEntity {
  id?: number;
  programId: number;
  time: number,
  type: TimerTypes
}

export class AppDB extends Dexie {
  programs!: Table<ProgramEntity, number>;
  timers!: Table<TimerListEntity, number>;

  constructor() {
    super('TimerDatabase');
    this.version(3).stores({
      programs: '++id',
      timers: '++id, programId',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const programId = await db.programs.add({
      name: 'Training',
    });
    await db.timers.bulkAdd([
      {
        programId,
        time: 20,
        type: TimerTypes.training,
      },
      {
        programId,
        time: 5,
        type: TimerTypes.break,
      },
      {
        programId,
        time: 20,
        type: TimerTypes.training,
      },
    ]);
  }
}

export const db = new AppDB();
