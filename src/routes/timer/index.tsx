import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './timer.css?inline';
import PlayButton from "~/components/play-button/playButton";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <h1>Choose Timer</h1>
      <div class={'card'}>
        <a href={'/timer-runner'}>
          <PlayButton play={true} />
        </a>

        <div class={'timer-description'}>
          <h2>Timername</h2>
          <div class={'timer-description-sets'}>
            <span>Sets:</span>
            <span>3</span>
          </div>
        </div>
      </div>
    </>
  )
})