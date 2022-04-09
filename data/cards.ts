import { CardProps, Phase, Status, Card } from "../models";

const cards: CardProps[] = [
  {
    id: 1,
    title: "Dashboard Re-design",
    description: "Want to test out a showcase dashboard",
    endDate: "2022-04-20T00:00:00.000",
    status: Status.Todo,
    phase: Phase.Prototype,
  },
  {
    id: 2,
    title: "EveryDollar Budget Card",
    description:
      "Users are inclined to budget more if they see their unallocated transactions",
    status: Status.Todo,
    phase: Phase.Prototype,
  },
];

export default cards.map((c) => new Card(c));
