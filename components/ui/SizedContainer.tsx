import React from "react";

type SizedContainerProps = {
  ratio: string;
  children: React.ReactNode;
};

export const SizedContainer: React.FC<SizedContainerProps> = ({
  ratio,
  children,
}) => {
  const _ratio = ratio.split("/");
  const width = +_ratio[0];
  const height = +_ratio[1];

  const paddingY = (height / width / 2) * 100;

  return (
    <div
      className="flex w-full h-0 relative"
      style={{ padding: `${paddingY}% 0` }}
    >
      <div className="flex absolute top-0 left-0 w-full h-full">{children}</div>
    </div>
  );
};
