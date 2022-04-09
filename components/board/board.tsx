import { useLocale } from "../../hooks";
import useCardSort from "../../hooks/useCardSort";
import { Card } from "../../models";
import ColumnHeader from "./columnheader";
import Row from "./row";
import RowHeader from "./rowheader";
import Square from "./square";
import Table from "./table";
import { Card as CardComponent } from "..";
import { Squares } from "../../types";

type BoardProps = {
  cards: Card[];
};

export default function Board(props: BoardProps) {
  const { cards } = props;
  const { prototype, test, scale } = useCardSort(cards);
  const t = useLocale();

  function onDrop(cardId: number, column: Squares) {
    console.log("card id", cardId, "column", column);
  }

  return (
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
  );
}
