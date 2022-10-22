import { Timer } from './Timer';


export interface Program {
  id?: number,
  name: string,
  timers: Timer[];
}
