import { TdHTMLAttributes } from "react";
import styles from "./board.module.scss";

type SquareProps = TdHTMLAttributes<HTMLTableCellElement> & {};

export default function Square(props: SquareProps) {
  const { id, children } = props;

  return (
    <td id={id} className={styles["Board-square"]}>
      {children}
    </td>
  );
}
