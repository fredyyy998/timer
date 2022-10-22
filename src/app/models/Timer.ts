
export interface Timer {
  time: number,
  type: TimerTypes
}

export enum TimerTypes {
  break,
  training,
}
