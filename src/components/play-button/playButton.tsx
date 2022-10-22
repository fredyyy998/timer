import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './playButton.css?inline';

export default component$((props: { play: boolean }) => {
  useStylesScoped$(styles);
  return (
    <div className={'play-button'}>
      <div className={'inner-play-button'}>
            <span>
              <PlayPause play={props.play} />
            </span>
      </div>
    </div>
  )
})

export function PlayPause(props: { play: boolean }) {
  if (props.play) {
    return <i className="fa-solid fa-play fa-2xl"></i>
  }
  return <i className="fa-solid fa-pause fa-2xl"></i>
}