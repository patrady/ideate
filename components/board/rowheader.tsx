import { ThHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./board.module.scss";

type RowHeaderProps = ThHTMLAttributes<HTMLTableCellElement> & {
  title: string;
  description: string;
  variant: "prototype" | "test" | "scale";
};

export default function RowHeader(props: RowHeaderProps) {
  const { title, description, variant } = props;

  return (
    <th
      scope="row"
      className={clsx(
        styles["Board-rowHeader"],
        styles[`Board-rowHeader--${variant}`]
      )}
    >
      <span className={styles["Board-rowTitle"]}>{title}</span>
      <span className={styles["Board-rowDescription"]}>{description}</span>
    </th>
  );
}
