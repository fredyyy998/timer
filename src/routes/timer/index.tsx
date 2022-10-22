import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './timer.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <h1>Choose Timer</h1>
      <div class={'card'}>
        <div class={'play-button'}>
          <div class={'inner-play-button'}>
            <span>
              <i className="fa-solid fa-play fa-2xl"></i>
            </span>
          </div>
        </div>
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