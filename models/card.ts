import { Phase, Status } from "../types";

type TestProps = {
  metrics: string;
  successCriteria: string;
  learnings: string;
};

type ScaleProps = {
  notes: string;
};

type PrototypeProps = {
  notes: string;
};

export type CardProps = {
  id: number;
  title: string;
  description: string;
  prototype: PrototypeProps;
  test: TestProps;
  scale: ScaleProps;
  endDate?: string | Date;
  tags: string[];
  status: Status;
  phase: Phase;
  order: number;
  isArchived: boolean;
  links: string[];
};

export type AddCardProps = Pick<
  CardProps,
  | "title"
  | "description"
  | "prototype"
  | "test"
  | "scale"
  | "tags"
  | "isArchived"
  | "links"
>;

export type UpdateCardProps = Pick<
  CardProps,
  | "title"
  | "description"
  | "prototype"
  | "test"
  | "scale"
  | "tags"
  | "isArchived"
  | "links"
>;

export class Card {
  id: number;
  title: string;
  description: string;
  prototype: PrototypeProps;
  test: TestProps;
  scale: ScaleProps;
  endDate?: Date;
  tags: string[];
  status: Status;
  phase: Phase;
  order: number;
  isArchived: boolean;
  links: string[];

  constructor({
    id,
    title,
    description,
    test,
    scale,
    prototype,
    endDate,
    tags,
    status,
    phase,
    order,
    isArchived,
    links,
  }: CardProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.prototype = prototype;
    this.test = test;
    this.scale = scale;
    this.endDate = endDate ? new Date(endDate) : undefined;
    this.tags = tags || [];
    this.status = status;
    this.phase = phase;
    this.order = order;
    this.isArchived = isArchived;
    this.links = links || [];
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
    const cards = await this.getByTeam();
    const previousCard = cards.length > 0 ? cards[cards.length - 1] : undefined;
    const newCard = new Card({
      ...props,
      id: (previousCard?.id || 0) + 1,
      status: Status.Todo,
      phase: Phase.Prototype,
      order: 10,
    });

    localStorage.setItem("cards", JSON.stringify([...cards, newCard]));

    return newCard;
  }

  public async move(phase: Phase, status: Status) {
    const cards = await Card.getByTeam();
    const index = cards.findIndex((c) => c.equals(this));
    if (index === -1) {
      return this;
    }

    cards[index] = new Card({ ...this, phase, status });
    localStorage.setItem("cards", JSON.stringify(cards));

    return cards[index];
  }

  public async update(props: UpdateCardProps) {
    const cards = await Card.getByTeam();
    const index = cards.findIndex((c) => c.equals(this));
    if (index === -1) {
      return this;
    }

    cards[index] = new Card({ ...this, ...props });
    localStorage.setItem("cards", JSON.stringify(cards));

    return cards[index];
  }

  public async delete() {
    const cards = await Card.getByTeam();
    const newCards = cards.filter((c) => !c.equals(this));

    localStorage.setItem("cards", JSON.stringify(newCards));

    return this;
  }

  public equals(card: number | Card) {
    if (typeof card === "number") {
      return this.id === card;
    }

    return this.id === card.id;
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

  public isToDo() {
    return this.status === Status.Todo;
  }

  public isDoing() {
    return this.status === Status.Doing;
  }

  public isDone() {
    return this.status === Status.Done;
  }

  public isPrototype() {
    return this.phase === Phase.Prototype;
  }

  public isTest() {
    return this.phase === Phase.Test;
  }

  public isScale() {
    return this.phase === Phase.Scale;
  }
}
