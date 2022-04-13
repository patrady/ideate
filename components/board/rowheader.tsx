import { ThHTMLAttributes } from "react";
import clsx from "clsx";
import Text from '@ramsey-design-system/text';
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
      <Text className={styles["Board-rowTitle"]} element="span" size="bodyLarge">{title}</Text>
      <Text className={styles["Board-rowDescription"]} element="span" size="bodySmall">{description}</Text>
    </th>
  );
}
