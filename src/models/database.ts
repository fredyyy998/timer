import Dexie, { Table } from 'dexie';
import { Program } from "~/models/Programm";

export class TimerDatabase extends Dexie {
  programs!: Table<Program>;

  constructor() {
    super('TimerDatabase');
    this.version(1).stores({
      programs: '++id, name, times'
    });
  }
}

export const database = new TimerDatabase();
