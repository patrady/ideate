import { ThHTMLAttributes } from "react";
import Text from "@ramsey-design-system/text";
import styles from "./board.module.scss";

type ColumnHeaderProps = ThHTMLAttributes<HTMLTableCellElement> & {
  empty?: false;
  title: string;
};

type ColumnHeaderEmptyProps = ThHTMLAttributes<HTMLTableCellElement> & {
  empty: true;
};

export default function ColumnHeader(
  props: ColumnHeaderProps | ColumnHeaderEmptyProps
) {
  const { empty } = props;

  if (empty) {
    return <td></td>;
  }

  return (
    <Text
      element="th"
      size="bodyLarge"
      scope="col"
      className={styles["Board-header"]}
    >
      {props.title}
    </Text>
  );
}
