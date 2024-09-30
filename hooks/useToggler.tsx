import React from "react";

export function useToggler(initialState = false): {
  value: boolean;
  toggle: (value?: boolean) => void;
  handler: (value?: boolean) => () => void;
} {
  const [booleanValue, set_booleanValue] =
    React.useState<boolean>(initialState);

  function toggle(value?: boolean) {
    set_booleanValue((_value) =>
      typeof value !== "undefined" ? value : !_value,
    );
  }

  function handler(value?: boolean) {
    return () => {
      toggle(value);
    };
  }

  return {
    value: booleanValue,
    toggle,
    handler,
  };
}
