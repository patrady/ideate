import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./rds.module.scss";

type ButtonGroupProps = {
  children: ReactNode;
  alignRight?: boolean;
};

export default function ButtonGroup(props: ButtonGroupProps) {
  const { alignRight, children } = props;

  return (
    <div
      className={clsx(styles["rds-ButtonGroup"], {
        [styles["rds-ButtonGroup--right"]]: alignRight,
      })}
    >
      {children}
    </div>
  );
}
