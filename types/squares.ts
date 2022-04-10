import { Phase, Status } from ".";

export type SquareId = `${Phase}-${Status}`;

type SquaresType = { [key: string]: SquareId };

export const Squares: SquaresType = {
  PrototypeTodo: "prototype-todo",
  PrototypeDoing: "prototype-doing",
  PrototypeDone: "prototype-done",
  TestTodo: "test-todo",
  TestDoing: "test-doing",
  TestDone: "test-done",
  ScaleTodo: "scale-todo",
  ScaleDoing: "scale-doing",
  ScaleDone: "scale-done",
};

export function parseSquareId(square: SquareId): [Phase, Status] {
  const [phase, status] = square.split("-");

  return [phase as Phase, status as Status];
}
