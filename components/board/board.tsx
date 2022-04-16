import { useBool, useCards, useLocale, useSelected } from "../../hooks";
import ColumnHeader from "./columnheader";
import Row from "./row";
import RowHeader from "./rowheader";
import Square from "./square";
import Table from "./table";
import { Card as CardComponent } from "..";
import { parseSquareId, SquareId, Squares } from "../../types";
import { AddCardModal, UpdateCardModal } from "../card";
import { AddCardFormProps } from "../card/addCardModal";
import styles from "./board.module.scss";
import { Card, UpdateCardProps } from "../../models";
import Button from "@ramsey-design-system/button";

export default function Board() {
  const { cards, addCard, moveCard, updateCard, removeCard } = useCards();
  const [isAddModalOpen, closeAddModal, openAddModal] = useBool();
  const [selectedCard, setSelectedCard, resetSelectedCard] =
    useSelected<Card>();
  const t = useLocale();
  const { prototype, test, scale } = cards.sort();

  async function onDrop(cardId: number, column: SquareId) {
    const [phase, status] = parseSquareId(column);
    const card = cards.find(cardId);
    if (!card) {
      return;
    }

    await moveCard(card, phase, status);
  }

  async function handleAddCard(values: AddCardFormProps) {
    await addCard(values);
    closeAddModal();
  }

  async function handleUpdateCard(values: UpdateCardProps) {
    if (!selectedCard) {
      return;
    }

    await updateCard(selectedCard, values);
    resetSelectedCard();
  }

  async function handleDeleteCard() {
    if (!selectedCard) {
      return;
    }

    await removeCard(selectedCard);
    resetSelectedCard();
  }

  return (
    <>
      <Table>
        <thead>
          <Row>
            <ColumnHeader empty />
            <ColumnHeader title={t.board.columns.todo} />
            <ColumnHeader title={t.board.columns.doing} />
            <ColumnHeader title={t.board.columns.done} />
          </Row>
        </thead>
        <tbody>
          <Row>
            <RowHeader
              variant="prototype"
              title={t.board.rows.prototype.title}
              description={t.board.rows.prototype.description}
            />
            <Square id={Squares.PrototypeTodo} onCardDrop={onDrop}>
              {prototype.todo.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
            <Square id={Squares.PrototypeDoing} onCardDrop={onDrop}>
              {prototype.doing.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
            <Square id={Squares.PrototypeDone} onCardDrop={onDrop}>
              {prototype.done.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
          </Row>
          <Row>
            <RowHeader
              variant="test"
              title={t.board.rows.test.title}
              description={t.board.rows.test.description}
            />
            <Square id={Squares.TestTodo} onCardDrop={onDrop}>
              {test.todo.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
            <Square id={Squares.TestDoing} onCardDrop={onDrop}>
              {test.doing.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
            <Square id={Squares.TestDone} onCardDrop={onDrop}>
              {test.done.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
          </Row>
          <Row>
            <RowHeader
              variant="scale"
              title={t.board.rows.scale.title}
              description={t.board.rows.scale.description}
            />
            <Square id={Squares.ScaleTodo} onCardDrop={onDrop}>
              {scale.todo.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
            <Square id={Squares.ScaleDoing} onCardDrop={onDrop}>
              {scale.doing.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
            <Square id={Squares.ScaleDone} onCardDrop={onDrop}>
              {scale.done.map((c) => (
                <CardComponent key={c.id} card={c} onEdit={setSelectedCard} />
              ))}
            </Square>
          </Row>
        </tbody>
      </Table>
      <Button
        className={styles["Board-addCard"]}
        onClick={openAddModal}
      >
        {t.board.addCard}
      </Button>
      <AddCardModal
        isOpen={isAddModalOpen}
        onAdd={handleAddCard}
        onClose={closeAddModal}
      />

      {selectedCard && (
        <UpdateCardModal
          isOpen
          card={selectedCard}
          onUpdate={handleUpdateCard}
          onDelete={handleDeleteCard}
          onClose={resetSelectedCard}
        />
      )}
    </>
  );
}
