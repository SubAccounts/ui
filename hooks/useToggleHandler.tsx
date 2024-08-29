import React from "react";

export function useToggleHandler(
  initialState = false,
): [boolean, (value?: boolean) => () => void] {
  const [isOpen, set_isOpen] = React.useState<boolean>(initialState);

  return [
    isOpen,
    (value?: boolean) => () =>
      set_isOpen((_value) => (typeof value !== "undefined" ? value : !_value)),
  ];
}
