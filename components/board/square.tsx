import clsx from "clsx";
import { TdHTMLAttributes } from "react";
import { useDrop } from "react-dnd";
import { Squares } from "../../types";
import styles from "./board.module.scss";

type SquareProps = TdHTMLAttributes<HTMLTableCellElement> & {
  id: Squares;
  onCardDrop(id: number, column: Squares): void;
};

export default function Square(props: SquareProps) {
  const { id, onCardDrop, children } = props;
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "card",
      drop: (item: { id: number }) => onCardDrop(item.id, id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <td
      id={id}
      ref={drop}
      className={clsx(styles["Board-square"], {
        [styles["Board-square--active"]]: isOver,
      })}
    >
      {children}
    </td>
  );
}
