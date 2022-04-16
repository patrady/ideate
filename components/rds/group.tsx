import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./rds.module.scss";

type GroupProps = {
  children: ReactNode;
  alignRight?: boolean;
};

export default function Group(props: GroupProps) {
  const { alignRight, children } = props;

  return (
    <div
      className={clsx(styles["rds-Group"], {
        [styles["rds-Group--right"]]: alignRight,
      })}
    >
      {children}
    </div>
  );
}
