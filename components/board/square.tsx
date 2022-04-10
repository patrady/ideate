import clsx from "clsx";
import { TdHTMLAttributes } from "react";
import { useDrop } from "react-dnd";
import { SquareId } from "../../types";
import styles from "./board.module.scss";

type SquareProps = TdHTMLAttributes<HTMLTableCellElement> & {
  id: SquareId;
  onCardDrop(id: number, column: SquareId): void;
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
    [onCardDrop, id]
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
