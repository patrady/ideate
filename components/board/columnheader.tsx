import { ThHTMLAttributes } from "react";
import styles from './board.module.scss';

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

  return <th scope="col" className={styles["Board-header"]}>{props.title}</th>;
}
