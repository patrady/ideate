import { useDrag } from "react-dnd";
import { Card as CardModel } from "../../models";
import styles from "./card.module.scss";

type CardProps = {
  card: CardModel;
};

export default function Card(props: CardProps) {
  const {
    card: { id, title, endDate },
  } = props;

  const [, drag] = useDrag(() => ({
    type: "card",
    item: { id },
  }));

  return (
    <div className={styles.Card} ref={drag}>
      <div className="flex space-between">
        <div className={styles["Card-title"]}>{title}</div>
        <button className={styles["Card-edit"]}>E</button>
      </div>
      {endDate && (
        <div className={styles["Card-end"]}>{endDate.toLocaleDateString()}</div>
      )}
    </div>
  );
}
