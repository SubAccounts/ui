import React from "react";

export interface Toggler {
  (value?: boolean, immediately?: boolean): () => void;
}

export function useToggleHandler(initialState = false): [boolean, Toggler] {
  const [booleanValue, set_booleanValue] =
    React.useState<boolean>(initialState);

  function toggle(value?: boolean) {
    set_booleanValue((_value) =>
      typeof value !== "undefined" ? value : !_value,
    );
  }

  return [
    booleanValue,
    (value?: boolean, immediately?: boolean) => {
      if (immediately) {
        toggle(value);
      }

      return () => toggle(value);
    },
  ];
}
