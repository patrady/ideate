import { useMemo, useState } from "react";
import { NoOp } from "../types";

type SetTrue = NoOp;
type SetFalse = NoOp;
type UseBool = [boolean, SetFalse, SetTrue];

/**
 * Creates a boolean state
 * @param initialValue Default set to `false`.
 * @returns [bool, setFalse, setTrue].
 */
function useBool(initialValue = false): UseBool {
  const [value, setValue] = useState(initialValue);
  const callbacks = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
    }),
    []
  );

  return [value, callbacks.setFalse, callbacks.setTrue];
}

export default useBool;
