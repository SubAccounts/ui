import React from "react";

import styles from "./SizedContainer.module.css";

type SizedContainerProps = {
  children: React.ReactNode;
  ratio: [number, number];
};

export const SizedContainer: React.FC<SizedContainerProps> = ({
  children,
  ratio,
}) => {
  const paddingY = (ratio[1] / ratio[0] / 2) * 100;

  return (
    <div className={styles.container} style={{ padding: `${paddingY}% 0` }}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
