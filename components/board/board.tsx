import { useLocale } from "../../hooks";
import ColumnHeader from "./columnheader";
import Row from "./row";
import RowHeader from "./rowheader";
import Square from "./square";
import Table from "./table";

type BoardProps = {
  cards: React.ReactNode;
};

export default function Board(props: BoardProps) {
  const { cards } = props;
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
          <Square id="todo-prototype">
            <></>
          </Square>
          <Square id="doing-prototype">
            <></>
          </Square>
          <Square id="done-prototype">
            <></>
          </Square>
        </Row>
        <Row>
          <RowHeader
            variant="test"
            title={t.board.rows.test.title}
            description={t.board.rows.test.description}
          />
          <Square id="todo-test">
            <></>
          </Square>
          <Square id="doing-test">
            <></>
          </Square>
          <Square id="done-test">
            <></>
          </Square>
        </Row>
        <Row>
          <RowHeader
            variant="scale"
            title={t.board.rows.scale.title}
            description={t.board.rows.scale.description}
          />
          <Square id="todo-scale">
            <></>
          </Square>
          <Square id="doing-scale">
            <></>
          </Square>
          <Square id="done-scale">
            <></>
          </Square>
        </Row>
      </tbody>
    </Table>
  );
}
