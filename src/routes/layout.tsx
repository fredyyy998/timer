import { component$, Slot } from '@builder.io/qwik';
import Header from "~/components/header/header";

export default component$(() => {
  return (
    <>
      <Header></Header>
      <main>
          <Slot />
      </main>
    </>
  );
});
