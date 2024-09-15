import React from "react";
import { Input as _Input } from "@nextui-org/react";

type InputProps = {
  label: string;
  value: string;
  type?: "text" | "number" | "password";
  onChange: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  id?: string;
  max?: number;
  min?: number;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({
  disabled,
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  id,
  type = "text",
  max,
  min,
}) => {
  const onKeyDownCapture: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (type === "number") {
      if (
        ![
          ..."1234567890.aAcCvVxX".split(""),
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Control",
        ].includes(event.key)
      ) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  return (
    <>
      <_Input
        autoComplete="off"
        color="primary"
        disabled={disabled}
        id={id}
        label={label}
        max={max}
        min={min}
        placeholder={placeholder}
        type={type === "number" ? "text" : type}
        value={value}
        variant="bordered"
        onBlurCapture={onBlur}
        onChange={(e) => onChange(e.target.value)}
        onKeyDownCapture={onKeyDownCapture}
      />
    </>
  );
};
