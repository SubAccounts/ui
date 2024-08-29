import React from "react";

type BodyCellProps = {
  children: React.ReactNode;
};

const thClassName =
  "border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-800 dark:text-slate-200 text-left";

export const HeadCell: React.FC<BodyCellProps> = ({ children }) => {
  return <th className={thClassName}>{children}</th>;
};
