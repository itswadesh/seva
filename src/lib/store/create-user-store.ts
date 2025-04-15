import { writable } from "svelte/store";

export default function createUserStore(initialData) {
  const userStore = writable(initialData);

  return {
    subscribe: userStore.subscribe,
    updateMe(newMe) {
      userStore.update((userData) => ({
        ...userData,
        me: newMe,
      }));
    },
  };
}
