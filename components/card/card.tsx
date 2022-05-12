import { useDrag } from "react-dnd";
import Text from "@ramsey-design-system/text";
import Button from "@ramsey-design-system/button";
import Stack from "@ramsey-design-system/stack";
import Tag from "@ramsey-design-system/tag";
import { Card as CardModel } from "../../models";
import { EditOutlinedIcon } from "..";
import { TimeOutlined } from "../icons/icons";
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
      <div className={styles["Card-footer"]}>
        {card.showTime() && (
          <div className={styles["Card-time"]}>
            <TimeOutlined className={styles["Card-time-icon"]} />
            <Text className={styles["Card-time-text"]} size="bodySmall">
              {`${card.getTestStartDate()} - ${card.getTestEndDate()}`}
            </Text>
          </div>
        )}
        {card.tags.length > 0 && (
          <Stack spacing="small">
            {card.tags.map((tag, i) => (
              <Tag key={i} text={tag} color="primary" subtle />
            ))}
          </Stack>
        )}
      </div>
    </div>
  );
}
