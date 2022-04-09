import { useLocale } from "../../hooks";
import useCardSort from "../../hooks/useCardSort";
import { Card } from "../../models";
import ColumnHeader from "./columnheader";
import Row from "./row";
import RowHeader from "./rowheader";
import Square from "./square";
import Table from "./table";
import { Card as CardComponent } from "..";

type BoardProps = {
  cards: Card[];
};

export default function Board(props: BoardProps) {
  const { cards } = props;
  const { prototype, test, scale } = useCardSort(cards);
  const t = useLocale();

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
          <Square id="prototype-todo">
            {prototype.todo.map((c) => (
              <CardComponent key={c.id} card={c} />
            ))}
          </Square>
          <Square id="prototype-doing">
            {prototype.doing.map((c) => (
              <CardComponent key={c.id} card={c} />
            ))}
          </Square>
          <Square id="prototype-done">
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
          <Square id="test-todo">
            {test.todo.map((c) => (
              <CardComponent key={c.id} card={c} />
            ))}
          </Square>
          <Square id="test-doing">
            {test.doing.map((c) => (
              <CardComponent key={c.id} card={c} />
            ))}
          </Square>
          <Square id="test-done">
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
          <Square id="scale-todo">
            {scale.todo.map((c) => (
              <CardComponent key={c.id} card={c} />
            ))}
          </Square>
          <Square id="scale-doing">
            {scale.doing.map((c) => (
              <CardComponent key={c.id} card={c} />
            ))}
          </Square>
          <Square id="scale-done">
            {scale.done.map((c) => (
              <CardComponent key={c.id} card={c} />
            ))}
          </Square>
        </Row>
      </tbody>
    </Table>
  );
}
