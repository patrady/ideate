import { HTMLAttributes } from "react";
import styles from "./board.module.scss";

export default function Row(props: HTMLAttributes<HTMLTableRowElement>) {
  const { children } = props;

  return <tr className={styles["Board-row"]}>{children}</tr>;
}
