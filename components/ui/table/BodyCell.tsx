import React from "react";
import clsx from "clsx";

type BodyCellProps = {
  children: React.ReactNode;
  isLast?: boolean;
  colSpan?: number;
};

const tdClassName =
  "border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400";

const lastRowTdClassName = "!border-0";

export const BodyCell: React.FC<BodyCellProps> = ({
  children,
  isLast,
  colSpan,
}) => {
  return (
    <td
      className={clsx(tdClassName, {
        [lastRowTdClassName]: isLast,
      })}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};
