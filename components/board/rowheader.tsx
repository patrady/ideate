import { ThHTMLAttributes } from "react";
import styles from "./board.module.scss";

type RowHeaderProps = ThHTMLAttributes<HTMLTableCellElement> & {
  title: string;
  description: string;
};

export default function RowHeader(props: RowHeaderProps) {
  const { title, description } = props;

  return (
    <th scope="row" className={styles["Board-rowHeader"]}>
      <span className={styles["Board-rowTitle"]}>{title}</span>
      <span className={styles["Board-rowDescription"]}>{description}</span>
    </th>
  );
}
