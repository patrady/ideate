import Button from "@ramsey-design-system/button";
import { useDrag } from "react-dnd";
import Icon from "@ramsey-design-system/icon"
import { EditOutlinedIcon } from "@ramsey-design-system/icons/dist";
import Text from '@ramsey-design-system/text';
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
        <Text className={styles["Card-title"]} element="section">{card.title}</Text>
        {/* <Button className={styles["Card-edit"]} icon={<Icon icon={EditOutlinedIcon} />} iconOnly onClick={handleEdit} /> */}
        <button className={styles["Card-edit"]} onClick={handleEdit} >E</button>
      </div>
      {card.endDate && (
        <Text className={styles["Card-end"]} size="bodySmall">
          {card.endDate.toLocaleDateString()}
        </Text>
      )}
    </div>
  );
}
