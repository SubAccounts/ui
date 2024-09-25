import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";

type TabsProps = {
  options: [string, string, boolean?][];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const Tabs: React.FC<TabsProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="flex w-full flex-col gap-2 items-start">
      <ButtonGroup className="align-start" color="primary" variant="bordered">
        {options.map(([_value, title, _disabled]) => (
          <Button
            key={_value}
            disabled={_disabled || disabled}
            variant={_value === value ? "solid" : "bordered"}
            onClick={() => onChange(_value)}
          >
            {title}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
