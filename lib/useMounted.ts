import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** false en el servidor y en la hidratación; true una vez montado en el cliente. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
