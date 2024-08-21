"use client";

import React from "react";

type TextBlockProps = {
  children?: React.ReactNode;
  lines?: (React.ReactNode | [React.ReactNode, React.ReactNode])[];
};

export const TextBlock: React.FC<TextBlockProps> = ({ children, lines }) => {
  const _lines = lines || [];

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full border-1 rounded p-4 bg-gray-100 dark:bg-gray-900">
      {typeof children !== "undefined" ? (
        <div className="flex flex-col w-full text-left items-start">
          {children}
        </div>
      ) : (
        _lines.map((line, index) => (
          <div
            key={`line_${index}`}
            className="flex flex-col w-full text-left items-start"
          >
            {Array.isArray(line) ? (
              <>
                <p className="text-xl font-bold">{line[0]}</p>
                <p>{line[1]}</p>
              </>
            ) : (
              line
            )}
          </div>
        ))
      )}
    </div>
  );
};
