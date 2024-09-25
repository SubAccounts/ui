import React from "react";

import { Input, InputProps } from "@/components/common/Input";
import { titleH3 } from "@/components/primitives";

type InputWithTitleProps = InputProps & {
  title?: string;
};

export const InputWithTitle: React.FC<InputWithTitleProps> = ({
  title,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {title && <h3 className={titleH3({ size: "sm" })}>{title}</h3>}
      <div className="flex flex-col w-full items-start justify-start">
        <Input {...props} />
      </div>
    </div>
  );
};
