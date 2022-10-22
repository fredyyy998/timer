import { Timer } from "~/models/Timer";

export type Program = {
  id?: string,
  name: string,
  timers: Timer[];
}