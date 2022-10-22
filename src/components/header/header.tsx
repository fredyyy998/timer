import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class={'header'}>

    </div>
  )
})