import { component$, useStore, useStylesScoped$, useWatch$ } from "@builder.io/qwik";
import styles from "./timer-runner.css?inline";
import PlayButton from "~/components/play-button/playButton";
import { Timer } from "~/models/Timer";
import { TimerTypes } from "~/models/TimerTypes";
import { database } from "~/models/database";

type timerRunningState = {
  timer: number,
  isRunning: boolean,
  timerId: any
  timerIndex: number,
}

export default component$(() => {
  useStylesScoped$(styles);
  const timers: Timer[] = [{ time: 20, type: TimerTypes.training }, { type: TimerTypes.break, time: 5}];
  // const program: Program = { name: 'Training 1', timers: timers };
  const store = useStore<timerRunningState>({ timer: timers[0].time, isRunning: false, timerId: undefined, timerIndex: 0 });

  console.log(database.programs.toArray());

  useWatch$(({ track }) => {
    // track changes in store.count
    track(() => store.isRunning);
    if (store.isRunning) {
      store.timerId = setInterval(() => {
        store.timer--;
        if (store.timer === 0) {
          store.timerIndex++;
          if (store.timerIndex > 2) {
            clearInterval(store.timerId);
          } else {
            store.timer = 5;
          }

        }
      }, 1000)
    } else {
      clearInterval(store.timerId);
    }
  })

    return (
    <div class={'main-container'}>
      <div class={'end-timer'}>
        <a href={'../timer'}>
          <span>End Session</span>
        </a>
      </div>
      <div class={'desciption-next'}>
        <span>Next: Break 15s</span>
      </div>
      <div className={'timer'}>
        <span>{store.timer }s</span>
      </div>
      <div onClick$={() => store.isRunning = !store.isRunning}>
        <PlayButton play={!store.isRunning}/>
      </div>
    </div>
  )
});