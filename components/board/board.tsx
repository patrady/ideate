import { useCards, useLocale } from "../../hooks";
import ColumnHeader from "./columnheader";
import Row from "./row";
import RowHeader from "./rowheader";
import Square from "./square";
import Table from "./table";
import { Card as CardComponent } from "..";
import { parseSquareId, SquareId, Squares } from "../../types";
import { useState } from "react";
import { AddCardModal } from "../card";
import { AddCardFormProps } from "../card/addCardModal";
import styles from './board.module.scss';

export default function Board() {
  const { cards, addCard, moveCard } = useCards();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
    setIsAddModalOpen(false);
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
                <CardComponent key={c.id} card={c} />
              ))}
            </Square>
            <Square id={Squares.PrototypeDoing} onCardDrop={onDrop}>
              {prototype.doing.map((c) => (
                <CardComponent key={c.id} card={c} />
              ))}
            </Square>
            <Square id={Squares.PrototypeDone} onCardDrop={onDrop}>
              {prototype.done.map((c) => (
                <CardComponent key={c.id} card={c} />
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
                <CardComponent key={c.id} card={c} />
              ))}
            </Square>
            <Square id={Squares.TestDoing} onCardDrop={onDrop}>
              {test.doing.map((c) => (
                <CardComponent key={c.id} card={c} />
              ))}
            </Square>
            <Square id={Squares.TestDone} onCardDrop={onDrop}>
              {test.done.map((c) => (
                <CardComponent key={c.id} card={c} />
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
                <CardComponent key={c.id} card={c} />
              ))}
            </Square>
            <Square id={Squares.ScaleDoing} onCardDrop={onDrop}>
              {scale.doing.map((c) => (
                <CardComponent key={c.id} card={c} />
              ))}
            </Square>
            <Square id={Squares.ScaleDone} onCardDrop={onDrop}>
              {scale.done.map((c) => (
                <CardComponent key={c.id} card={c} />
              ))}
            </Square>
          </Row>
        </tbody>
      </Table>
      <button className={styles['Board-addCard']} onClick={() => setIsAddModalOpen(true)}>Add Card</button>
      <AddCardModal
        isOpen={isAddModalOpen}
        onAdd={handleAddCard}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
