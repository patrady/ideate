import { CardProps, Card } from "../models";
import { Phase, Status } from "../types";

const cards: CardProps[] = [
  {
    id: 1,
    title: "Dashboard Re-design",
    description: "Want to test out a showcase dashboard",
    endDate: "2022-04-20T00:00:00.000",
    status: Status.Todo,
    phase: Phase.Prototype,
    order: 0
  },
  {
    id: 2,
    title: "EveryDollar Budget Card",
    description:
      "Users are inclined to budget more if they see their unallocated transactions",
    status: Status.Todo,
    phase: Phase.Prototype,
    order: 1
  },
];

export default cards.map((c) => new Card(c));
