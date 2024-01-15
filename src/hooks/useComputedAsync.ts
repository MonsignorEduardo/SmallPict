import { Signal, useSignal, useSignalEffect } from "@preact/signals";

export function useComputedAsync<T>(
  fn: () => Promise<T>,
  deps: Signal[],
): Signal<T | undefined> {
  const outPutSignal = useSignal<T | undefined>(undefined);

  useSignalEffect(
    () => {
      deps.forEach((dep) => {
        dep.value;
      });
      fn().then((value) => {
        outPutSignal.value = value;
      });
    },
  );

  return outPutSignal;
}
