import { useDrag } from "react-dnd";
import { Card as CardModel } from "../../models";
import styles from "./card.module.scss";

type CardProps = {
  card: CardModel;
  onEdit(card: CardModel): void;
};

export default function Card(props: CardProps) {
  const { card, onEdit } = props;

  const [, drag] = useDrag(() => ({
    type: "card",
    item: { id: card.id },
  }));

  function handleEdit() {
    onEdit(card);
  }

  return (
    <div className={styles.Card} ref={drag}>
      <div className="flex space-between">
        <div className={styles["Card-title"]}>{card.title}</div>
        <button className={styles["Card-edit"]} onClick={handleEdit}>
          E
        </button>
      </div>
      {card.endDate && (
        <div className={styles["Card-end"]}>
          {card.endDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
