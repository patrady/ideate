import { useMemo, useState } from "react";
import { NoOp } from "../types";

type SetSelected<T> = (value: T | undefined) => void;
type ResetSelected = NoOp;
export type UseSelected<T> = [T | undefined, SetSelected<T>, ResetSelected];

/**
 * Creates a selected state.
 * @note Useful for entities that when clicked, open a modal.
 * @param initialValue Defaults to undefined.
 * @returns `[value, setValue, resetValue]`.
 */
function useSelected<T>(initialValue?: T): UseSelected<T> {
  const [value, setValue] = useState<T | undefined>(initialValue);

  const callbacks = useMemo(
    () => ({
      set: setValue,
      reset: () => setValue(undefined),
    }),
    []
  );

  return [value, callbacks.set, callbacks.reset];
}

export default useSelected;
