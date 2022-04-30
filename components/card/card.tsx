import { useDrag } from "react-dnd";
import Text from "@ramsey-design-system/text";
import { Card as CardModel } from "../../models";
import styles from "./card.module.scss";
import Button from "@ramsey-design-system/button";
import { EditOutlinedIcon } from "..";

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
      <div className={styles["Card-content"]}>
        <Text element="section">{card.title}</Text>
        <Button
          iconOnly
          icon={EditOutlinedIcon}
          appearance="subtle"
          className={styles["Card-edit"]}
          aria-label="Edit Card"
          onClick={handleEdit}
        />
      </div>
      {card.endDate && (
        <Text className={styles["Card-end"]} size="bodySmall">
          {card.endDate.toLocaleDateString()}
        </Text>
      )}
    </div>
  );
}
