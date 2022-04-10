import { Phase, Status } from "../types";

export type CardProps = {
  id: number;
  title: string;
  description: string;
  testSuccessCriteria: string;
  endDate?: string | Date;
  status: Status;
  phase: Phase;
  order: number;
  isArchived: boolean;
};

export type AddCardProps = Pick<
  CardProps,
  "title" | "description" | "testSuccessCriteria" | "isArchived"
>;

export type UpdateCardProps = CardProps;

export class Card {
  id: number;
  title: string;
  description: string;
  testSuccessCriteria: string;
  endDate?: Date;
  status: Status;
  phase: Phase;
  order: number;
  isArchived: boolean;

  constructor({
    id,
    title,
    description,
    testSuccessCriteria,
    endDate,
    status,
    phase,
    order,
    isArchived,
  }: CardProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.testSuccessCriteria = testSuccessCriteria;
    this.endDate = endDate ? new Date(endDate) : undefined;
    this.status = status;
    this.phase = phase;
    this.order = order;
    this.isArchived = isArchived;
  }

  public static async getByTeam() {
    const cards = localStorage.getItem("cards");
    if (!cards) {
      return [];
    }

    const parsedCards: CardProps[] = await JSON.parse(cards);
    return parsedCards.map((c) => new Card(c));
  }

  public static async add(props: AddCardProps) {
    const { title, description, testSuccessCriteria, isArchived } = props;

    const cards = await this.getByTeam();
    const previousCard = cards.length > 0 ? cards[cards.length - 1] : undefined;
    const newCard = new Card({
      id: (previousCard?.id || 0) + 1,
      title,
      description,
      testSuccessCriteria,
      status: Status.Todo,
      phase: Phase.Prototype,
      order: 10,
      isArchived,
    });

    localStorage.setItem("cards", JSON.stringify([...cards, newCard]));

    return newCard;
  }

  public equals(card: number | Card) {
    if (typeof card === "number") {
      return this.id === card;
    }

    return this.id === card.id;
  }

  public move({ phase, status }: { phase: Phase; status: Status }) {
    return new Card({ ...this, phase, status });
  }

  public isPrototypeToDo() {
    return this.isPrototype() && this.isToDo();
  }

  public isPrototypeDoing() {
    return this.isPrototype() && this.isDoing();
  }

  public isPrototypeDone() {
    return this.isPrototype() && this.isDone();
  }

  public isTestToDo() {
    return this.isTest() && this.isToDo();
  }

  public isTestDoing() {
    return this.isTest() && this.isDoing();
  }

  public isTestDone() {
    return this.isTest() && this.isDone();
  }

  public isScaleToDo() {
    return this.isScale() && this.isToDo();
  }

  public isScaleDoing() {
    return this.isScale() && this.isDoing();
  }

  public isScaleDone() {
    return this.isScale() && this.isDone();
  }

  private isToDo() {
    return this.status === Status.Todo;
  }

  private isDoing() {
    return this.status === Status.Doing;
  }

  private isDone() {
    return this.status === Status.Done;
  }

  private isPrototype() {
    return this.phase === Phase.Prototype;
  }

  private isTest() {
    return this.phase === Phase.Test;
  }

  private isScale() {
    return this.phase === Phase.Scale;
  }
}
